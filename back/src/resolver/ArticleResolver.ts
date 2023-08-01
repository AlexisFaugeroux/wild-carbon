import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import dataSource from '../utils';
import { Article } from '../entity/Article';
import { EntityNotFoundError } from 'typeorm';

@Resolver()
class ArticleResolver {
    @Mutation(() => Article)
    async createArticle(
        @Arg('title') title:string, 
        @Arg('description') description: string,
        @Arg('url') url: string,
        @Arg('userId') userId: string
    ): Promise<Article> {
        try {
            if(!title || !description || !url) {
                throw new Error(
                    'One of the following fields is missing : title, description, url, createdAt'
                );
            }

            const article = new Article();
            article.title = title;
            article.description = description;
            article.url = url;
            article.createdAt = new Date();
            article.user.id = userId;
            const createdArticle = await dataSource.getRepository(Article).save(article);

            return createdArticle;
        } catch (error) {
            console.error(error);
            throw error;
          }
    }

    @Mutation(() => Article)
    async updateArticle(
        @Arg('title') title:string, 
        @Arg('description') description: string,
        @Arg('url') url: string,
        @Arg('articleId') id: string,
        @Arg('userId') userId: string
        ): Promise<Article> {
        try {
            const targetedArticle = await dataSource
            .getRepository(Article)
            .findOneByOrFail({ id });

            if(targetedArticle.user.id !== userId){
                throw new Error(
                    'your not a owner to this artcile'
                );
            }
            
            targetedArticle.title = title;
            targetedArticle.description = description;
            targetedArticle.url = url;
            targetedArticle.updatedAt = new Date();

            const updateArticle = await dataSource
            .getRepository(Article)
            .save(targetedArticle);
            return updateArticle;
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
            console.error('Article not found');
            } else {
            console.error(error);
            }
            throw error;
        }
    }

    @Mutation(() => String)
    async deleteArticle(@Arg('id') id: string): Promise<String> {
        const targetedArticle = await dataSource
        .getRepository(Article)
        .findOneByOrFail( {id} );

        await dataSource.getRepository(Article).remove(targetedArticle);
        return 'Article deleted';
    }

    @Query(() => Article)
    async getArticle(@Arg('articleId') id: string): Promise<Article> {
        const article = await dataSource
        .getRepository(Article)
        .findOneByOrFail({ id });

        return article;
    }

  @Query(() => [Article])
  async getAllArticle(): Promise<Article[]> {
    try {
      const articles = await dataSource.getRepository(Article).find();

      return articles;
    } catch (error) {
      throw error;
    }
  }
}

export default ArticleResolver;
