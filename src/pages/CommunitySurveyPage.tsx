import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { SURVEY_QUESTIONS } from '../constants/surveyQuestions';
import { ClipboardList, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, PieChart } from 'lucide-react';

export const CommunitySurveyPage: React.FC = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Record<string, string>>>({
    section1: {},
    section2: {},
    section3: {},
    section4: {},
    section5: {},
    section6: {},
  });
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const totalSections = SURVEY_QUESTIONS.length;
  const currentSection = SURVEY_QUESTIONS[currentStep];

  const handleOptionSelect = (qId: string, value: string) => {
    const secKey = `section${currentStep + 1}`;
    setAnswers((prev) => ({
      ...prev,
      [secKey]: {
        ...prev[secKey],
        [qId]: value,
      },
    }));
    setError(null);
  };

  const isCurrentStepValid = () => {
    const secKey = `section${currentStep + 1}`;
    const secAnswers = answers[secKey] || {};
    return currentSection.questions.every((q) => secAnswers[q.id]);
  };

  const handleNext = () => {
    if (!isCurrentStepValid()) {
      setError('Please answer all questions in this section to proceed.');
      return;
    }
    setError(null);
    if (currentStep < totalSections - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setError(null);
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCurrentStepValid()) {
      setError('Please answer all questions in this section to complete the survey.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await api.post('/surveys/responses', {
        section1: answers.section1,
        section2: answers.section2,
        section3: answers.section3,
        section4: answers.section4,
        section5: answers.section5,
        section6: answers.section6,
        isAnonymous,
      });

      setSubmitted(true);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to submit survey.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Thank You for Completing the Kuntamukkala CSP Survey!
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Your responses have been securely recorded in MongoDB. They directly inform Gram Panchayat action plans for educational accessibility, rainy-season transit, and drainage desilting.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs"
          >
            Go to Resident Dashboard
          </button>
          <button
            onClick={() => navigate('/reports')}
            className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-xs"
          >
            View Aggregated Analytics
          </button>
        </div>
      </div>
    );
  }

  const progressPercentage = Math.round(((currentStep + 1) / totalSections) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          <ClipboardList className="w-4 h-4" />
          <span>Community Service Project (CSP) Household Survey</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Kuntamukkala 22-Question Community Survey
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Help us evaluate school distance, travel conditions, drainage maintenance, mosquito concerns, and village priorities.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-emerald-600 dark:text-emerald-400">
            {currentSection.sectionTitle}
          </span>
          <span className="text-slate-500">
            Section {currentStep + 1} of {totalSections} ({progressPercentage}%)
          </span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400 text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Questions Card */}
      <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {currentSection.sectionTitle}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {currentSection.description}
          </p>
        </div>

        <div className="space-y-6">
          {currentSection.questions.map((q, idx) => {
            const secKey = `section${currentStep + 1}`;
            const selectedVal = answers[secKey]?.[q.id] || '';

            return (
              <div key={q.id} className="space-y-3 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50">
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {idx + 1}. {q.question} <span className="text-red-500">*</span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleOptionSelect(q.id, opt)}
                      className={`px-4 py-3 rounded-xl text-xs font-medium text-left transition-all border ${
                        selectedVal === opt
                          ? 'bg-emerald-600 text-white font-bold border-emerald-600 shadow-sm'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Anonymous Checkbox on Last Step */}
        {currentStep === totalSections - 1 && (
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-3">
            <input
              type="checkbox"
              id="anonymous"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label htmlFor="anonymous" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Submit responses anonymously without publishing respondent name
            </label>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Section</span>
          </button>

          {currentStep < totalSections - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
            >
              <span>Next Section</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50 flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{submitting ? 'Submitting Responses...' : 'Submit Complete Survey'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
