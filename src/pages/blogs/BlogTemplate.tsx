import React from "react";
import { BackToTopButton } from "../../../components/BackToTopButton";

export const BlogTemplate = () => {
  return (
    <div className="standard-dialog p-12">
      <title>Hadoop 面经</title>
      <div className="content">
        <h1>This is an blog page</h1>
      </div>
      <BackToTopButton />
    </div>
  );
};
