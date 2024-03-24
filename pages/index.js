import Head from "next/head";
import { useEffect, useState } from "react";
import AppAds from "../src/Components/Home/AppAds/AppAds";
import Banner from "../src/Components/Home/Banner/Banner";
import Category from "../src/Components/Home/Category/Category";
import DownloadApp from "../src/Components/Home/DownloadApp/DownloadApp";
import NewsLetter from "../src/Components/Home/NewsLetter/NewsLetter";
import PopularProducts from "../src/Components/Home/PopularProducts/PopularProducts";
import ProductSection from "../src/Components/ProductSection/ProductSection";
import CustomButtonLoading from "../src/Shared/CustomButtonLoading";
import ScrollButtons from "../src/Shared/ScrollButton/ScrollButtons";

export async function getStaticProps() {
  const bannerRes = await fetch('https://backend-five-teal.vercel.app/api/v1/banner?status=active&sort=position');
  const bannerData = await bannerRes.json();

  const categoryRes = await fetch('https://backend-five-teal.vercel.app/api/v1/category?status=true');
  const categoryData = await categoryRes.json();

  const productsRes = await fetch('https://backend-five-teal.vercel.app/api/v1/product?status=true');
  const productsData = await productsRes.json();

  return {
    props: {
      banners: bannerData,
      category: categoryData,
      products: productsData
    },
    revalidate: 15, // Regenerate every 15 seconds
  };
}

export default function Home({ banners, category, products }) {

  const [bannerData, setBannerData] = useState(banners);
  const [categoryData, setCategoryData] = useState(category);
  const [productsData, setProductsData] = useState(products);

  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);


  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch('https://backend-five-teal.vercel.app/api/v1/banner?status=active&sort=position');
      const newData = await res.json();
      setBannerData(newData);
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch('https://backend-five-teal.vercel.app/api/v1/category?status=true');
      const newData = await res.json();
      setCategoryData(newData);
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch('https://backend-five-teal.vercel.app/api/v1/product?status=true ');
      const newData = await res.json();
      setProductsData(newData);
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    if (productsData && productsData.data) {
      const products = productsData.data.products;
      // Sorting by createdAt for newArrivals
      const newArrivals = [...products].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setNewArrivalProducts(newArrivals);

      // Sorting by discount for discounted products
      const discounted = [...products].sort((a, b) => a.discount - b.discount);
      setDiscountedProducts(discounted);
    }
  }, [productsData]);

  return (
    <>
      <Head>
        <title>Arshi Kids</title>
        <meta name="description" content="Best e-commerce website for baby shop" />
        <link rel="icon" href="/favicon.ico" />

        <script>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'GTM-5M2KXP7H');
         `}
        </script>
      </Head>
      <Banner data={bannerData}  catagories={categoryData}/>
      <Category catagories={categoryData} />
      {/* <PopularProducts /> */}
      <ProductSection
        // query={"&sort=-createdAt&limit=10"}
        heading={"New Arrivals"}
        subtitle={
          "Discover the Latest and Greatest: Our New Arrivals Collection"
        }
        data={newArrivalProducts}
      // viewQuery={"sort=-createdAt"}
      />
      {/* <ProductSection
        query={"&sort=-saleCount&limit=10"}
        heading={"Best Sales"}
        subtitle={
          "Hottest Products of the Season: Check Out Our Best-Selling Collection"
        }
        viewQuery={"sort=-saleCount"}
      /> */}
      <div className="">
        <ProductSection
          // query={"&sort=-discount&limit=10"}
          heading={"Latest Discounted Products"}
          subtitle={"Shop Our Exclusive Discount Deals on Popular Products"}
          // viewQuery={"sort=-discount"}
          data={discountedProducts}
        />
      </div>
      {/* <div className="block md:hidden">
          <Category />
        </div> */}
      <NewsLetter />
      <AppAds />
      <ScrollButtons />

    </>
  );
}
