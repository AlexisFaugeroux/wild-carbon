import {
  Box,
  Button,
  Paper,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { GET_ALL_ARTICLES } from "../../gql/ArticleGql";
import { useLazyQuery } from "@apollo/client";
import { ArticleType } from "../../types/article";
import { useEffect } from "react";
import Carousel from "react-material-ui-carousel";

export default function GoodDeals() {
  const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const isPortrait = useMediaQuery("(orientation: portrait)");
  const isLandscape = useMediaQuery("(orientation: landscape)");

  const calculateHeight = () => {
    if (isLg) {
      return "25vh";
    } else if (isPortrait) {
      return "25vh";
    } else if (isLandscape) {
      return "35vh";
    }
  };
  const [fetchArticles, { data: dataArticles }] = useLazyQuery<{
    getAllArticle: ArticleType[];
  }>(GET_ALL_ARTICLES);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return (
    <Box
      sx={{
        width: "100%",
        // height: "auto",
      }}
    >
      <Carousel
        animation="slide"
        sx={{
          border: "2px solid #3C8962",
          margin: 0,
          height: calculateHeight(),
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {dataArticles?.getAllArticle?.map((art) => {
          return (
            <Paper key={art.id} sx={{ height: "100%" }} elevation={0}>
              <Box
                sx={{
                  width: "80%",
                  margin: "auto",
                  // height: {
                  //   lg: "23vh",
                  // },
                }}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                    fontSize: {
                      xs: "1.1rem",
                      sm: "1.1rem",
                      md: "1.3rem",
                      lg: "1.4rem",
                      xl: "1.5rem",
                    },
                  }}
                >
                  {art.title}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: {
                      xs: "1rem",
                      sm: "1.1rem",
                      md: "1.3rem",
                      lg: "1.4rem",
                      xl: "1.5rem",
                    },
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    WebkitLineClamp: 4,
                  }}
                >
                  {art.description}
                </Typography>
                <Button
                  sx={{
                    width: "100%",
                    marginTop: "0.25rem",
                    fontSize: "0.75rem",
                  }}
                  onClick={() => art.url}
                >
                  En savoir plus...
                </Button>
              </Box>
            </Paper>
          );
        })}
      </Carousel>
    </Box>
  );
}
