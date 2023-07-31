import React, { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick } from "../assets";

import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  // Load data from localStorage on mount
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const existingArticle = allArticles.find((item) => item.url === article.url);
  
    if (existingArticle) return setArticle(existingArticle);
  
    const { data } = await getSummary({ articleUrl: article.url });
    console.log("Response data:", data);
  
    if (data?.result) {
      const emails = Object.keys(data.result);
      console.log("Emails:", emails);
  
      const summary = emails.join(", ");
      const newArticle = { ...article, summary };
      const updatedAllArticles = [newArticle, ...allArticles];
  
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
  
      console.log("Summary:", summary);
    }
  };

  const handleClearHistory = () => {
    setAllArticles([]);
    localStorage.removeItem("articles");
  };

  // copy the url and toggle the icon for user feedback
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  const handleEmailClick = (emails) => {
    const emailList = emails.split(", ");
    const mailtoLink = "mailto:" + emailList.join(",");
    window.location.href = mailtoLink;
  };

  


  return (
    <section className="mt-16 w-full max-w-xl">
    {/* Search */}
    <div className="flex flex-col w-full gap-2">
        <form className="relative flex justify-center items-center" onSubmit={handleSubmit}>
          <img src={linkIcon} alt="link-icon" className="absolute left-0 my-2 ml-3 w-5" />
          <input
            type="url"
            placeholder="Input the website link"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            onKeyDown={handleKeyDown}
            required
            className="url_input peer"
          />
          <button type="submit" className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">
            <p>↵</p>
          </button>

          <button type="button" className="clear_history_btn" onClick={handleClearHistory}>
            Clear History
          </button>
        
    
        </form>


        {/* Browse History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt={copied === item.url ? "tick_icon" : "copy_icon"}
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Result */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well, that was not supposed to happen...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Email <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
              <p className="link_email" onClick={() => handleEmailClick(article.summary)}>
                {article.summary}
              </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
