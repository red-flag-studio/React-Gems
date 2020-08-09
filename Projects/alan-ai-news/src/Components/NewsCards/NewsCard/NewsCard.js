import React from "react";
import {
  Card,
  CardMedia,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import useStyles from "./Styles";
import classNames from "classnames";

export default function NewsCard({
  article: { description, publishedAt, source, title, urlToImage, url },
  i,
  active,
}) {
  const classes = useStyles();
  return (
    <Card
      className={classNames(classes.card, active ? classes.activeCard : null)}
    >
      <CardActionArea href={url} target="_blank">
        <CardMedia
          className={classes.media}
          image={
            urlToImage || "https://alan.app/voice/images/previews/preview.jpg"
          }
        />
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {new Date(publishedAt).toDateString()}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h2">
            {source.name}
          </Typography>
        </div>
        <Typography gutterBottom variant="h5" className={classes.title}>
          {title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary">
            Learn More
          </Button>
          <Typography variant="h5" color="textSecondary">
            {i + 1}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
