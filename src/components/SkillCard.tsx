/**
 * Reusable Skill Selection Card Component
 * Allows a student to toggle a skill, choose their proficiency level
 * (Beginner / Intermediate / Advanced), and adjust a 1–5 confidence slider.
 */

import React from 'react';
import {
  CONFIDENCE_LABELS,
  SelectedSkill,
  SkillItem,
  SkillLevel,
} from '../data/skillsData';
import { Check } from 'lucide-react';

interface SkillCardProps {
  skill: SkillItem;
  selectedData?: SelectedSkill;
  onToggleSkill: (skill: SkillItem) => void;
  onUpdateLevel: (skillId: string, level: SkillLevel) => void;
  onUpdateConfidence: (skillId: string, confidence: number) => void;
}

const LEVELS: SkillLevel[] = ['Beginner', 'Intermediate', 'Advanced'];

export const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  selectedData,
  onToggleSkill,
  onUpdateLevel,
  onUpdateConfidence,
}) => {
  const isSelected = Boolean(selectedData);

  return (
    <div
      className={`bg-white border rounded-xl p-5 transition-colors ${
        isSelected
          ? 'border-sky-600 ring-1 ring-sky-600/20'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Top Header Row: Checkbox + Skill Title & Unboxed Category Metadata */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>{skill.category}</span>
            {isSelected && selectedData && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-sky-700">
                  Selected ({selectedData.level})
                </span>
              </>
            )}
          </div>
          <h3 className="text-base font-semibold text-slate-900">{skill.name}</h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            {skill.description}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onToggleSkill(skill)}
          aria-pressed={isSelected}
          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border transition-colors cursor-pointer ${
            isSelected
              ? 'bg-sky-600 border-sky-600 text-white'
              : 'bg-slate-50 border-slate-300 text-slate-400 hover:border-slate-400 hover:text-slate-600'
          }`}
          title={isSelected ? `Remove ${skill.name}` : `Select ${skill.name}`}
        >
          <Check className="w-5 h-5" />
        </button>
      </div>

      {/* Expanded Configuration Controls when skill is selected */}
      {isSelected && selectedData && (
        <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
          {/* Experience Level Selector (Segmented Interactive Control) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Experience Level
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-lg">
              {LEVELS.map((lvl) => {
                const active = selectedData.level === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => onUpdateLevel(skill.id, lvl)}
                    className={`py-1.5 px-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      active
                        ? 'bg-white text-slate-900 font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Labeled Confidence Slider (1 to 5) with explicit numeric readout */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <label
                htmlFor={`conf-${skill.id}`}
                className="text-xs font-semibold text-slate-700"
              >
                Self-Confidence Rating
              </label>
              <span className="font-mono tabular-nums text-xs font-semibold text-sky-700">
                {selectedData.confidence} / 5
              </span>
            </div>

            <input
              id={`conf-${skill.id}`}
              type="range"
              min={1}
              max={5}
              step={1}
              value={selectedData.confidence}
              onChange={(e) =>
                onUpdateConfidence(skill.id, parseInt(e.target.value, 10))
              }
              className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
            />

            <div className="flex justify-between text-[11px] font-mono tabular-nums text-slate-400 mt-1">
              <span>1 (Low)</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5 (High)</span>
            </div>

            <p className="text-xs text-slate-600 mt-1.5">
              {CONFIDENCE_LABELS[selectedData.confidence]}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
