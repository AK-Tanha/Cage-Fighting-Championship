"use client";

import React, { useMemo } from "react";
import SelectWithImage from "./SelectWithImage";
import { JudgeScorecard, JudgeRoundScore } from "@/types";

interface JudgeOption {
  value: string;
  label: string;
  imageUrl?: string;
}

interface Props {
  options: JudgeOption[];
  judges: string[];
  scorecards: JudgeScorecard[];
  rounds: number;
  fighter1Name?: string;
  fighter2Name?: string;
  onChange: (patch: { judges?: string[]; scorecards?: JudgeScorecard[] }) => void;
}

const MAX_JUDGES = 3;

const JudgeScorecardEditor: React.FC<Props> = ({
  options,
  judges,
  scorecards,
  rounds,
  fighter1Name,
  fighter2Name,
  onChange,
}) => {
  const slots = useMemo(() => {
    const arr = [...(judges || [])];
    while (arr.length < MAX_JUDGES) arr.push("");
    return arr.slice(0, MAX_JUDGES);
  }, [judges]);

  const emptyRounds = (count: number): JudgeRoundScore[] =>
    Array.from({ length: count }, (_, i) => ({
      round_number: i + 1,
      fighter1_score: 10,
      fighter2_score: 9,
    }));

  const reconcile = (
    nextJudges: string[],
    nextScorecards: JudgeScorecard[],
  ): { judges: string[]; scorecards: JudgeScorecard[] } => {
    const cleaned = nextJudges.filter((j, i) => j && nextJudges.indexOf(j) === i);
    let cards = nextScorecards.filter((sc) => cleaned.includes(sc.judge_id));
    for (const jid of cleaned) {
      const existing = cards.find((sc) => sc.judge_id === jid);
      if (!existing) {
        cards.push({ judge_id: jid, rounds: emptyRounds(rounds) });
      } else {
        const current = existing.rounds || [];
        const next = Array.from({ length: rounds }, (_, i) => {
          const r = i + 1;
          const existingRound = current.find((cr) => cr.round_number === r);
          return existingRound
            ? { ...existingRound }
            : { round_number: r, fighter1_score: 10, fighter2_score: 9 };
        });
        cards = cards.map((sc) =>
          sc.judge_id === jid ? { ...sc, rounds: next } : sc,
        );
      }
    }
    return { judges: cleaned, scorecards: cards };
  };

  const handleJudgeChange = (slotIndex: number, judgeId: string) => {
    const nextJudges = [...slots];
    nextJudges[slotIndex] = judgeId;
    onChange(reconcile(nextJudges, scorecards || []));
  };

  const handleScoreChange = (
    judgeId: string,
    roundNumber: number,
    corner: "fighter1_score" | "fighter2_score",
    value: number,
  ) => {
    const nextCards = (scorecards || []).map((sc) => {
      if (sc.judge_id !== judgeId) return sc;
      return {
        ...sc,
        rounds: (sc.rounds || []).map((r) =>
          r.round_number === roundNumber ? { ...r, [corner]: value } : r,
        ),
      };
    });
    onChange({ scorecards: nextCards });
  };

  const hasJudges = slots.some((s) => s);
  const roundsToRender = Math.max(1, rounds || 3);

  const judgeTotal = (sc: JudgeScorecard | undefined, corner: "fighter1_score" | "fighter2_score") =>
    (sc?.rounds || []).reduce((sum, r) => sum + (r[corner] || 0), 0);

  const roundInvalid = (r: JudgeRoundScore) =>
    r.fighter1_score !== 10 && r.fighter2_score !== 10 && r.fighter1_score !== r.fighter2_score;

  return (
    <div className="mt-4 pt-4 border-t border-black/5">
      <div className="flex items-center justify-between mb-3">
        <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">
          Judges (3 per fight) — 10-Point Must
        </label>
        <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400">
          Winner of each round gets 10 · loser 9 or less · 10-10 even
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        {slots.map((jid, i) => (
          <div key={i} className="flex flex-col">
            <label className="mb-1 text-[9px] font-black uppercase tracking-widest text-gray-400">
              Judge {i + 1}
            </label>
            <SelectWithImage
              options={options}
              value={jid}
              onChange={(v) => handleJudgeChange(i, v)}
              placeholder={`Select Judge ${i + 1}`}
            />
          </div>
        ))}
      </div>

      {hasJudges && (
        <div className="overflow-x-auto rounded-sm border border-black/5">
          <table className="w-full text-left border-collapse bg-white">
            <thead>
              <tr className="bg-gray-50 text-[9px] text-gray-400 font-bold uppercase tracking-widest border-b border-black/5">
                <th className="p-2 pl-3">Judge</th>
                {Array.from({ length: roundsToRender }, (_, i) => (
                  <th key={i} className="p-2 text-center">
                    R{i + 1}
                  </th>
                ))}
                <th className="p-2 text-center">Total</th>
              </tr>
            </thead>
            <tbody className="text-[10px] font-bold">
              {slots
                .filter((jid) => jid)
                .map((jid) => {
                  const sc = (scorecards || []).find((c) => c.judge_id === jid);
                  const judgeName =
                    options.find((o) => o.value === jid)?.label || "Judge";
                  return (
                    <tr key={jid} className="border-b border-black/5 last:border-b-0">
                      <td className="p-2 pl-3 uppercase tracking-tight text-gray-700 whitespace-nowrap">
                        {judgeName}
                      </td>
                      {Array.from({ length: roundsToRender }, (_, i) => {
                        const rn = i + 1;
                        const r = (sc?.rounds || []).find((x) => x.round_number === rn);
                        const scores = r || { round_number: rn, fighter1_score: 10, fighter2_score: 9 };
                        const invalid = roundInvalid(scores);
                        return (
                          <td key={rn} className="p-1.5 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <input
                                type="number"
                                min={0}
                                max={10}
                                value={scores.fighter1_score}
                                onChange={(e) =>
                                  handleScoreChange(jid, rn, "fighter1_score", Number(e.target.value))
                                }
                                className={`w-10 bg-red-50 border rounded-sm px-1 py-1 text-center text-[10px] font-bold focus:outline-none focus:border-[#FE0002] ${invalid ? "border-amber-400" : "border-black/10"}`}
                                title={`${fighter1Name || "Fighter 1"} score`}
                              />
                              <input
                                type="number"
                                min={0}
                                max={10}
                                value={scores.fighter2_score}
                                onChange={(e) =>
                                  handleScoreChange(jid, rn, "fighter2_score", Number(e.target.value))
                                }
                                className={`w-10 bg-blue-50 border rounded-sm px-1 py-1 text-center text-[10px] font-bold focus:outline-none focus:border-[#FE0002] ${invalid ? "border-amber-400" : "border-black/10"}`}
                                title={`${fighter2Name || "Fighter 2"} score`}
                              />
                            </div>
                          </td>
                        );
                      })}
                      <td className="p-2 text-center whitespace-nowrap">
                        <span className="text-red-600">{judgeTotal(sc, "fighter1_score")}</span>
                        <span className="text-gray-300 mx-1">-</span>
                        <span className="text-blue-600">{judgeTotal(sc, "fighter2_score")}</span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JudgeScorecardEditor;
