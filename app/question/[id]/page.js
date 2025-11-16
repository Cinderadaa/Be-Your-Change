"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { QUESTIONS } from "@/lib/questions";
import HoloCard from "@/components/HoloCard";
import FogOverlay from "@/components/FogOverlay";
import ChoiceButton from "@/components/ChoiceButton";
import BackButton from "@/components/BackButton";

export default function QuestionPage({ params }) {
  const router = useRouter();
  const idNum = Number(params.id);
  const question = useMemo(
    () => QUESTIONS.find(q => q.id === idNum),
    [idNum]
  );

  useEffect(() => {
    if (!question) router.replace("/");
  }, [question, router]);

  if (!question) return null;

  const handleChoice = (optionId) => {
    const raw = localStorage.getItem("byc_answers") || "[]";
    const arr = JSON.parse(raw);
    const existingIndex = arr.findIndex(a => a.questionId === question.id);
    const answer = { questionId: question.id, optionId };

    if (existingIndex >= 0) arr[existingIndex] = answer;
    else arr.push(answer);

    localStorage.setItem("byc_answers", JSON.stringify(arr));

    if (question.id < QUESTIONS.length) {
      router.push(`/question/${question.id + 1}`);
    } else {
      router.push("/soft");
    }
  };

  return (
    <main
      className="screen bg-cover"
      style={{ backgroundImage: `url(/${question.background})` }}
    >
      <FogOverlay />
      <HoloCard>
        <BackButton />
        <p className="typewriter question-text">{question.question}</p>
        <div className="choice-grid">
          {question.options.map(opt => (
            <ChoiceButton
              key={opt.id}
              label={opt.text}
              onClick={() => handleChoice(opt.id)}
            />
          ))}
        </div>
      </HoloCard>
    </main>
  );
}