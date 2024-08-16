import React from "react";
import { Button } from "../components/ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/store/slices/jobSlice";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    // <div className="relative w-full max-w-xl mx-auto my-20">
    //   <Carousel
    //     opts={{
    //       align: "start",
    //     }}
    //     className="relative overflow-hidden"
    //     orientation="horizontal"
    //   >
    //     <CarouselContent className="flex space-x-4">
    //       {category.map((cat, index) => (
    //         <CarouselItem
    //           key={index}
    //           className="flex-shrink-0 w-32 md:w-40 lg:w-48 p-2"
    //         >
    //           <Button
    //             onClick={() => searchJobHandler(cat)}
    //             variant="outline"
    //             className="w-full h-full rounded-full py-2 px-4"
    //           >
    //             {cat}
    //           </Button>
    //         </CarouselItem>
    //       ))}
    //     </CarouselContent>
    //     <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full cursor-pointer z-10">
    //       <span className="sr-only">Previous slide</span>
    //     </CarouselPrevious>
    //     <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full cursor-pointer z-10" />{" "}
    //   </Carousel>
    // </div>

    <div className="relative w-full max-w-3xl mx-auto my-20">
      <Carousel
        opts={{
          align: "start",
          infinite: true, // Ensure carousel loops indefinitely
          autoplay: true, // Enable autoplay
          autoplayInterval: 3000, // Interval in milliseconds
        }}
        className="relative overflow-hidden"
        orientation="horizontal"
      >
        <CarouselContent className="flex space-x-4">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="flex-shrink-0 w-32 md:w-40 lg:w-48 p-2"
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="w-full h-full rounded-lg py-3 px-6 bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full cursor-pointer z-10">
          <span className="sr-only">Previous slide</span>
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </CarouselPrevious>
        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full cursor-pointer z-10">
          <span className="sr-only">Next slide</span>
          {/* <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg> */}
        </CarouselNext>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
