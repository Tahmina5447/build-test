import { useState } from "react";

function Descriptions({ description, youtube }) {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  function extractVideoID(url) {
    const regex = /(?:\?v=|&v=|youtu\.be\/)([^&\n]+)/;
    const match = url.match(regex);
    if (match) {
      return match[1];
    }
    return null;
  }

  return (
    <>
      <div>
        <div className="bg-gray-200  gap-5  hidden md:flex">
          <button
            className={
              toggleState === 1 ? "bg-white p-3 border-b-2" : "p-3 min-w-max"
            }
            onClick={() => toggleTab(1)}
          >
            Product details
          </button>

          <button
            className={
              toggleState === 2
                ? "bg-white p-3 border-b-2 w-full text-left"
                : "p-3 min-w-max"
            }
            onClick={() => toggleTab(2)}
          >
            Video
          </button>
        </div>

        <div className="content-tabs  md:w-2/3 w-full py-5 ">
          <div
            className={toggleState === 1 ? "block  active-content" : "hidden"}
          >
            <h2 className="text-xl font-bold block md:hidden mb-2 bg-slate-200 p-4">
              Description
            </h2>
            {description && (
              <div className="p-1" dangerouslySetInnerHTML={{ __html: description }}></div>
            )}
          </div>

          <div
            className={toggleState === 2 ? "block  active-content" : "hidden"}
          >
            <hr />
            {youtube ? (
              <iframe
                width="100%"
                height="500"
                src={`https://www.youtube.com/embed/${extractVideoID(youtube)}`}
                title="YouTube video player"
                // frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <h2>Video Not Found</h2>
            )}
          </div>
        </div>
        <div className="block md:hidden">
          {youtube && (
            <iframe
              width="100%"
              height="auto"
              src={`https://www.youtube.com/embed/${extractVideoID(youtube)}`}
              title="YouTube video player"
              // frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </>
  );
}

export default Descriptions;
