import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keyword }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <meta name="keyword" content={keyword}></meta>
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "DiaryApp-v2",
  description: "Express yourself Privately or Publicly",
  keyword: "diary, posts,",
};

export default Meta;
