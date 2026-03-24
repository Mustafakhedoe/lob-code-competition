"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const questions: Question[] = [
  // 1-10 makkelijk
  { question: "Wat betekent HTML?", options: ["Hyper Trainer Marking Language","Hyper Text Markup Language","Hyper Text Marketing Language","Home Tool Markup Language"], answer: "Hyper Text Markup Language" },
  { question: "Welke tag gebruik je voor een link?", options: ["<a>", "<link>", "<href>", "<url>"], answer: "<a>" },
  { question: "Welke CSS property verandert tekst kleur?", options: ["font-style", "text-color", "color", "background"], answer: "color" },
  { question: "Wat doet JavaScript?", options: ["Maakt websites interactief","Stylet de website","Maakt database","Host de site"], answer: "Maakt websites interactief" },
  { question: "Welke tag is een heading?", options: ["<p>", "<h1>", "<div>", "<span>"], answer: "<h1>" },
  { question: "Hoe maak je een comment in HTML?", options: ["<!-- comment -->", "// comment", "/* comment */", "# comment"], answer: "<!-- comment -->" },
  { question: "Welke property maakt een element vet?", options: ["font-weight","text-style","font-bold","weight"], answer: "font-weight" },
  { question: "Hoe voeg je een externe CSS file toe?", options: ["<link rel='stylesheet' href='style.css'>","<css src='style.css'>","<style src='style.css'>","<script src='style.css'>"], answer: "<link rel='stylesheet' href='style.css'>" },
  { question: "Welke tag gebruik je voor een paragraaf?", options: ["<p>","<para>","<div>","<span>"], answer: "<p>" },
  { question: "Hoe declareer je een variabele in JS?", options: ["var x","let x","const x","alle drie"], answer: "alle drie" },

  // 11-20 medium
  { question: "Welke pseudo-class gebruik je bij hover?", options: [":hover", ":active", ":focus", ":visited"], answer: ":hover" },
  { question: "Wat doet 'document.getElementById'?", options: ["Zoekt element","Verwijdert element","Voegt element toe","Stylet element"], answer: "Zoekt element" },
  { question: "Hoe maak je een flex container?", options: ["display:flex","display:block","display:grid","display:inline"], answer: "display:flex" },
  { question: "Wat is de juiste manier om een array te maken in JS?", options: ["let arr=[]","let arr={}","let arr=()","array arr=[]"], answer: "let arr=[]" },
  { question: "Welke CSS property verandert lettertype?", options: ["font-family","text-style","font","letter-style"], answer: "font-family" },
  { question: "Wat doet 'addEventListener'?", options: ["Luistert naar events","Verwijdert events","Stylet events","Maakt events"], answer: "Luistert naar events" },
  { question: "Welke tag gebruik je voor een afbeelding?", options: ["<img>","<picture>","<image>","<src>"], answer: "<img>" },
  { question: "Wat is de default display van een div?", options: ["block","inline","flex","grid"], answer: "block" },
  { question: "Hoe krijg je de lengte van een array?", options: ["arr.length","arr.size","arr.count","arr.total"], answer: "arr.length" },
  { question: "Wat doet 'innerHTML'?", options: ["Verandert content","Verwijdert element","Verandert style","Maakt nieuw element"], answer: "Verandert content" },

  // 21-25 moeilijk
  { question: "Welke selector kiest alle kinderen van een element?", options: [">"," ","~","+ "], answer: ">" },
  { question: "Hoe stop je een event in JS?", options: ["event.preventDefault()","event.stopPropagation()","return false","alle bovenstaande"], answer: "alle bovenstaande" },
  { question: "Wat doet 'position: absolute'?", options: ["Positioneert relatief t.o.v eerstvolgende relative","Positioneert absoluut t.o.v viewport","Verwijdert element","Maakt element sticky"], answer: "Positioneert absoluut t.o.v viewport" },
  { question: "Wat doet 'display: grid'?", options: ["Maakt grid layout","Maakt flex layout","Verbergt elementen","Stylet elementen"], answer: "Maakt grid layout" },
  { question: "Hoe selecteer je meerdere elementen tegelijk in JS?", options: ["document.querySelectorAll","document.getElementsByClassName","document.getElementById","alle bovenstaande"], answer: "document.querySelectorAll" },
];

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const router = useRouter();

  const handleAnswer = (option: string) => {
    const correct = questions[current].answer;

    if (option === correct) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Fout! Antwoord: ${correct}`);
    }

    setTimeout(() => {
      setFeedback("");

      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        const percentage = Math.round(
          ((score + (option === correct ? 1 : 0)) / questions.length) * 100
        );

        const user = localStorage.getItem("username") || "Onbekend";
        const results = JSON.parse(localStorage.getItem("scores") || "[]");
        results.push({
          name: user,
          score: `${score + (option === correct ? 1 : 0)}/${questions.length}`,
          percentage,
        });
        localStorage.setItem("scores", JSON.stringify(results));
        router.push("/");
      }
    }, 1500);
  };

  const q = questions[current];

  return (
    <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md text-center">
        <h2 className="text-xl mb-4">
          Vraag {current + 1} / {questions.length}
        </h2>

        <h1 className="text-2xl font-bold mb-6">{q.question}</h1>

        <div className="space-y-3">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              className={`w-full p-3 rounded-lg mb-2 transition-colors ${
                feedback
                  ? opt === q.answer
                    ? "bg-green-500"
                    : "bg-red-500"
                  : "bg-blue-500 hover:bg-blue-400"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {feedback && (
          <p
            className={`mt-6 text-lg font-bold ${
              feedback.startsWith("✅") ? "text-green-400" : "text-red-500"
            }`}
          >
            {feedback}
          </p>
        )}
      </div>
    </main>
  );
}