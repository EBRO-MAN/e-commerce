import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            This is your personal map to understanding everything about this
            program, Unsure about the first step to take on your first, second
            or fifth day, the answer is probably in here. If you are wondering
            how to do something, the process document is probably linked
            somewhere in here.
          </p>
          <p>
            We have designed dedicated activities to foster your learning by
            connecting with your community for support while equipping you with
            key work-ready skills; Collaboration, communication across teams.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            The intranet is designed to automatically validate active
            participants who have an average score of 80% in their foundations
            and assign specialization tracks to them.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            It is important that you hit a 80% mark during the Foundation stage
            of youimport NewsletterBox from './../components/NewsletterBox'; r
            curriculum.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convinience:</b>
          <p className="text-gray-600">
            Our technical mentors have been trained to deal with students needs
            on a case by case basis.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            We leverage this method to ensure that you on the right part to
            collectively growing in technical, soft, and professional skills.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
