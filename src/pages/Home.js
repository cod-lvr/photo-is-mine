import { useState } from "react";
import axios from "axios"; //import third-p for fetching API.

import ImageContainer from "../components/ImageContainer.js"; //IMAGE CONTAINER
import arrow from "../media/arrow.png"; //IMAGE

function Home() {
  const [data, setData] = useState();
  const [btnClicked, setBtnCliked] = useState(false);

  // for fetching more items inside child component;
  const [fetchMoreData, setFetchMoreData] = useState(false);

  function formSubmitionHandler(event) {
    event.preventDefault();

    let page = 1; // declare page prameter for displaying another pages.
    // fetch data from userInput keyword
    async function fetchSearchedData() {
      page++;
      try {
        console.log("fetched");
        const response = await axios.get(
          `https://picsum.photos/v2/list?page=${page}&limit=20`
        );
        const imagesData = response.data;
        setData(imagesData);
        setBtnCliked(() => true);
      } catch (error) {
        console.error(error);
      }
    }
    if (fetchMoreData) {
      page = page + 1;
      fetchSearchedData();
    }
    fetchSearchedData();
  }

  function changePageDisplay() {
    setFetchMoreData(() => true);
  }

  // declare a form display for lean jsx
  let formDisplay;
  if (!btnClicked) {
    formDisplay = (
      <form onSubmit={formSubmitionHandler}>
        <header className="absolute top-16 right-12 text-sm">
          <h2 className="text-yellow">Get whatever image you want..</h2>
          <img src={arrow} alt="arrow-pointer" className="w-1/5 ml-20 mt-1 " />
        </header>
        <div className="absolute top-32 left-0 right-0 flex flex-col justify-between items-center">
          <button
            className="mt-7 p-2 bg-orange w-3/5 rounded lg:mt-0 lg:w-5/12 lg:ml-32 hover:bg-amber-600 hover:text-yellow"
            type="submit"
          >
            Generate new Photos
          </button>
        </div>
      </form>
    );
  } else {
    formDisplay = null;
  }

  const containerStyle = `${
    btnClicked
      ? "flex flex-col items-center justify-around"
      : "flex flex-col items-center justify-center"
  } container m-auto relative h-screen text-white uppercase lg:flex-col lg:justify-center`;

  return (
    <div className={containerStyle}>
      <header className="text-2xl relative rotate-0 lg:text-4xl">
        <h1 className="absolute w-max top-0 -right-20 lg:top-0 lg:-left-20">
          <span className="text-yellow">Photo</span> Is Mine..
        </h1>
      </header>
      <main className="w-11/12 mx-auto relative h-56 lg:w-8/12">
        <section>
          {formDisplay}
          {data ? (
            <ImageContainer data={data} changePage={changePageDisplay} />
          ) : null}
        </section>
      </main>
    </div>
  );
}

export default Home;
