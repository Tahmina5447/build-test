import React from "react";
import SecondaryImageCover from "../../src/Shared/SecondaryImageCover";
import Head from "next/head";
import { useQuery } from "react-query";
import Image from "next/image";
import GoogleMap from "../../src/Shared/GoogleMap";

const AboutUs = () => {
  return (
    <div>
      <Head>
        <title>About Us | Ecommerce Website</title>
      </Head>
      <SecondaryImageCover title={"about us"} />
      <div className="mid-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5  py-5">
          <div>
            <h2 className="font-bold text-3xl my-5">
              Welcome to our Arshi Kids
            </h2>
            <p>
              We're thrilled to be your go-to destination for all things fun and fashionable for your little ones. At Arshi kids, we believe that every child deserves to express their unique personality through their accessories, whether they're exploring the playground or attending a special event.
              <br />
              Our journey began with a simple vision: to provide high-quality, trendy accessories that inspire creativity and confidence in children. We carefully curate each item in our collection, ensuring that they not only meet our rigorous standards for durability and safety but also reflect the latest trends in kids' fashion.
            </p>
          </div>
          {/* image here */}
          <div className="p-3 md:p-6">
            <Image
              src={
                "/assets/about.jpg"
              }
              width={300}
              height={300}
              className="w-full"
              alt="about image group"
            />
          </div>
        </div>
        <div className="my-5">
          <GoogleMap />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
