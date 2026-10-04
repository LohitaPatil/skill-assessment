/**
 * 5. Skill Selection Page Component
 * Allows students to select skills across Programming, Database, Web Development,
 * Data, and Soft Skills, set their level (Beginner/Intermediate/Advanced),
 * and rate their confidence from 1 to 5.
 */

import React, { useState } from 'react';
import { PageRoute } from '../components/Navbar';
import { SkillCard } from '../components/SkillCard';
import {
  SKILL_CATEGORIES,
  SelectedSkill,
  SkillItem,
  SkillLevel,
} from '../data/skillsData';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface SkillSelectionPageProps {
  selectedSkills: SelectedSkill[];
  onSaveSkills: (skills: SelectedSkill[]) => void;
  onNavigate: (page: PageRoute) => void;
}

export const SkillSelectionPage: React.FC<SkillSelectionPageProps> = ({
  selectedSkills,
  onSaveSkills,
  onNavigate,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  const handleToggleSkill = (skill: SkillItem) => {
    setSavedNotice(false);
    const exists = selectedSkills.some((s) => s.skillId === skill.id);
    let updated: SelectedSkill[];

    if (exists) {
      updated = selectedSkills.filter((s) => s.skillId !== skill.id);
    } else {
      updated = [
        ...selectedSkills,
        {
          skillId: skill.id,
          name: skill.name,
          category: skill.category,
          level: 'Beginner',
          confidence: 3,
        },
      ];
    }
    onSaveSkills(updated);
  };

  const handleUpdateLevel = (skillId: string, level: SkillLevel) => {
    setSavedNotice(false);
    const updated = selectedSkills.map((s) =>
      s.skillId === skillId ? { ...s, level } : s
    );
    onSaveSkills(updated);
  };

  const handleUpdateConfidence = (skillId: string, confidence: number) => {
    setSavedNotice(false);
    const updated = selectedSkills.map((s) =>
      s.skillId === skillId ? { ...s, confidence } : s
    );
    onSaveSkills(updated);
  };

  const handleSelectStarterPack = () => {
    const starter: SelectedSkill[] = [
      { skillId: 'python', name: 'Python', category: 'Programming', level: 'Intermediate', confidence: 4 },
      { skillId: 'sql', name: 'SQL', category: 'Database', level: 'Beginner', confidence: 2 },
      { skillId: 'html', name: 'HTML', category: 'Web Development', level: 'Intermediate', confidence: 4 },
      { skillId: 'rest-apis', name: 'REST APIs', category: 'Web Development', level: 'Beginner', confidence: 3 },
      { skillId: 'communication', name: 'Communication', category: 'Soft Skills', level: 'Intermediate', confidence: 4 },
    ];
    onSaveSkills(starter);
    setSavedNotice(true);
  };

  const handleExplicitSave = () => {
    onSaveSkills(selectedSkills);
    setSavedNotice(true);
  };

  const categoriesList = ['All', ...SKILL_CATEGORIES.map((c) => c.category)];

  const visibleGroups =
    activeCategory === 'All'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.category === activeCategory);

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <div className="text-xs font-medium text-sky-700">
            Step 1 of 3 · Prior Learning Recognition
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Select Your Existing Skills
          </h1>
          <p className="text-sm text-slate-600">
            Choose the skills you have already studied or practiced. For each selected skill, pick
            your experience level (Beginner, Intermediate, Advanced) and rate your confidence from 1
            to 5.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleSelectStarterPack}
            className="px-3.5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            Load Sample 5 Skills
          </button>

          <button
            type="button"
            onClick={handleExplicitSave}
            className="px-4 py-2.5 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            Save Skills ({selectedSkills.length})
          </button>

          <button
            type="button"
            onClick={() => {
              onSaveSkills(selectedSkills);
              onNavigate('assessment');
            }}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <span>Proceed to Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Confirmation Notice when Saved */}
      {savedNotice && (
        <div
          role="status"
          className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-4 text-xs font-medium text-emerald-800"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Saved {selectedSkills.length} selected skill(s) to LocalStorage. Your personalized
              assessment is ready!
            </span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('assessment')}
            className="font-semibold underline hover:text-emerald-950 whitespace-nowrap cursor-pointer"
          >
            Start Assessment Now →
          </button>
        </div>
      )}

      {/* Interactive Category Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl overflow-x-auto">
          {categoriesList.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-white text-slate-900 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-slate-600 font-mono tabular-nums">
          Currently Selected: <strong>{selectedSkills.length}</strong> / 17 skills
        </div>
      </div>

      {/* Skill Category Sections */}
      <div className="space-y-10">
        {visibleGroups.map((group) => (
          <section key={group.category} className="space-y-4">
            <div className="border-b border-slate-200 pb-2 flex items-baseline justify-between">
              <div>
                <h2 className="font-display text-xl font-semibold text-slate-900">
                  {group.category}
                </h2>
                <p className="text-xs text-slate-500">{group.description}</p>
              </div>
              <span className="text-xs font-mono tabular-nums text-slate-500">
                {
                  group.skills.filter((sk) =>
                    selectedSkills.some((s) => s.skillId === sk.id)
                  ).length
                }{' '}
                / {group.skills.length} selected
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {group.skills.map((skill) => {
                const found = selectedSkills.find((s) => s.skillId === skill.id);
                return (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    selectedData={found}
                    onToggleSkill={handleToggleSkill}
                    onUpdateLevel={handleUpdateLevel}
                    onUpdateConfidence={handleUpdateConfidence}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
