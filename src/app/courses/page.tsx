"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  className?: string;
  number: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  isClosed: boolean;
  onClick: () => void;
  index: number;
  previousOpenCard: number | null;
}

const CourseCard: FC<CourseCardProps> = ({
  className,
  number,
  title,
  description,
  imageSrc,
  imageAlt,
  isClosed,
  onClick,
  index,
  previousOpenCard,
}) => {
  const getAnimationProps = () => {
    if (previousOpenCard === null) return { x: 100 };
    return {
      x: previousOpenCard < index ? -100 : 100,
    };
  };

  return (
    <Card
      onClick={onClick}
      className={cn(className, "rounded-3xl cursor-pointer overflow-hidden", {
        "col-span-2 bg-[#c33241] text-white": !isClosed,
        "col-span-1 bg-[#f9ebec] text-[#c33241]": isClosed,
      })}
    >
      <CardContent className="flex h-full flex-col p-8 gap-8">
        <div
          className={cn("self-end", {
            hidden: isClosed,
          })}
        >
          <Button
            variant="link"
            className="text-white text-[18px] hover:no-underline group p-0 flex items-center gap-2"
          >
            View all Courses
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {!isClosed && (
            <motion.div
              key={`image-${index}`}
              initial={getAnimationProps()}
              animate={{ x: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="flex gap-4"
            >
              <Image
                src={imageSrc}
                width={1920}
                height={1080}
                alt={imageAlt}
                className="object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={cn("flex items-center gap-4 !mt-auto", {
            "flex-col-reverse": isClosed,
          })}
        >
          <div
            className={cn("flex items-start", {
              "text-white/90": !isClosed,
              "text-[#c33241]": isClosed,
            })}
          >
            <span className="text-[120px] font-bold leading-[100%]">
              {number}
            </span>
            <sup className="text-[48px] mt-10 font-bold">+</sup>
          </div>

          <div
            className={cn("flex flex-col gap-3", {
              "-rotate-90 lg:mb-20": isClosed,
            })}
          >
            <h2 className="font-bold text-[32px] mb-1 leading-[120%]">
              {title}
            </h2>
            <p
              className={cn("flex text-[18px] leading-[120%] flex-col", {
                "text-white/90": !isClosed,
                "text-[#c33241]": isClosed,
              })}
            >
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CoursePage: FC = () => {
  const [openCard, setOpenCard] = useState<number | null>(0);
  const [previousOpenCard, setPreviousOpenCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setPreviousOpenCard(openCard);
    setOpenCard(index);
  };

  const courses = [
    {
      number: "23",
      title: "All Courses",
      description: "courses you're powering through right now.",
      imageSrc: "/tech-stack.png",
      imageAlt: "Tech Stack",
      isClosed: false,
    },
    {
      number: "15",
      title: "Upcoming Courses",
      description: "exciting new courses waiting to boost your skills.",
      imageSrc: "/tech-stack.png",
      imageAlt: "Tech Stack",
      isClosed: true,
    },
    {
      number: "08",
      title: "Ongoing Courses",
      description: "currently happening—don't miss out on the action!",
      imageSrc: "/tech-stack.png",
      imageAlt: "Tech Stack",
      isClosed: true,
    },
  ];

  return (
    <div className="container courses-page mx-auto px-16 flex items-center justify-center min-h-screen">
      <div>
        <div className="mb-12 flex flex-col gap-5">
          <h1 className="text-2xl text-[#414141]">
            Explore our classes and master trending skills!
          </h1>

          <h2 className="text-[32px] font-bold">
            Dive Into&nbsp;
            <span className="text-[#1da077]">What's Hot Right Now! 🔥</span>
          </h2>
        </div>

        <div className="grid grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              {...course}
              index={index}
              previousOpenCard={previousOpenCard}
              isClosed={openCard !== index}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
