import React, { useState, useEffect } from "react";

// NoimaZois - 28-Day Journal Demo (Greek, dark mode)
// Single-file React component (default export). Uses Tailwind CSS classes.
// Saves progress & notes to localStorage. Mobile-first responsive layout.

const DAYS = Array.from({ length: 28 }, (_, i) => ({
  id: i + 1,
  title: `Ημέρα ${i + 1}`,
}));

const WEEK_TITLES = [
  "Εβδομάδα 1: Αυτογνωσία – «Ποιος είμαι πραγματικά;»",
  "Εβδομάδα 2: Σχέση με τον Κόσμο – «Τι δίνω;»",
  "Εβδομάδα 3: Δημιουργία & Ροή – «Τι με κάνει να ανθίζω;»",
  "Εβδομάδα 4: Όραμα – «Πού πάω από εδώ;»",
];

const DAY_TASKS = [
  // Week 1
  "Γράψε 5 στιγμές της ζωής σου που ένιωσες ζωντανός ή περήφανος.",
  "Τι σε κάνει να ξεχνάς τον χρόνο όταν το κάνεις;",
  "Ποιες αξίες θεωρείς ιερές;",
  "Ποια 3 πράγματα αν έλειπαν από τη ζωή σου, θα ένιωθες άδειος;",
  "Μίλα με έναν κοντινό άνθρωπο και ρώτα: “Πότε με έχεις δει πιο ευτυχισμένο;”",
  "Συγκέντρωσε τις απαντήσεις και δες μοτίβα.",
  "Γράψε μια σύντομη φράση: «Είμαι κάποιος που βρίσκει νόημα όταν…»",
  // Week 2
  "Ποιον ή τι θα ήθελες να βοηθήσεις στη ζωή σου;",
  "Κάνε μια μικρή πράξη καλοσύνης, χωρίς να το αναφέρεις σε κανέναν.",
  "Ποιο πρόβλημα στον κόσμο σε πονάει;",
  "Αν είχες 1 μέρα ζωής, πώς θα την περνούσες;",
  "Επικοινώνησε με κάποιον που έχεις καιρό να μιλήσεις.",
  "Μείνε 10 λεπτά στη φύση χωρίς κινητό, απλώς παρατήρησε.",
  "Σκέψου πώς θέλεις να συνεισφέρεις στον κόσμο.",
  // Week 3
  "Κάνε κάτι καινούργιο, όσο μικρό κι αν είναι.",
  "Φτιάξε κάτι με τα χέρια σου ή γράψε κάτι που βγαίνει από μέσα σου.",
  "Μίλα σε κάποιον για το πάθος σου.",
  "Βρες έναν μικρό στόχο 7 ημερών (π.χ. γράψε κάθε μέρα 5 λεπτά).",
  "Απόλαυσε μια στιγμή πλήρως, χωρίς να τη φωτογραφίσεις.",
  "Κάνε κάτι που σε φοβίζει λίγο αλλά νιώθεις ότι αξίζει.",
  "Νιώσε ευγνωμοσύνη για ό,τι έχεις χτίσει.",
  // Week 4
  "Φαντάσου τον εαυτό σου σε 5 χρόνια, πραγματικά ευτυχισμένο.",
  "Ποια είναι τα 3 βασικά στοιχεία αυτής της ζωής;",
  "Τι χρειάζεται να σταματήσεις να κάνεις;",
  "Τι χρειάζεται να ξεκινήσεις να κάνεις;",
  "Φτιάξε ένα προσωπικό “όραμα ζωής” 2-3 προτάσεων.",
  "Σχεδίασε 3 μικρά βήματα που θα κάνεις μέσα στον επόμενο μήνα.",
  "Γράψε ένα γράμμα στον εαυτό σου για το πώς νιώθεις τώρα.",
];

function storageKey(key) {
  return `noima_zois_v1_${key}`;
}

export default function NoimaZoisApp() {
  const [currentDay, setCurrentDay] = useState(() => {
    const saved = localStorage.getItem(storageKey("currentDay"));
    return saved ? Number(saved) : 1;
  });

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem(storageKey("notes"));
    return saved ? JSON.parse(saved) : {};
  });

  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem(storageKey("completed"));
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(storageKey("currentDay"), String(currentDay));
  }, [currentDay]);

  useEffect(() => {
    localStorage.setItem(storageKey("notes"), JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(storageKey("completed"), JSON.stringify(completed));
  }, [completed]);

  const toggleComplete = (dayId) => {
    setCompleted((prev) => {
      const copy = { ...prev };
      copy[dayId] = !copy[dayId];
      return copy;
    });
  };

  const updateNote = (dayId, text) => {
    setNotes((prev) => ({ ...prev, [dayId]: text }));
  };

  const completedCount = Object.values(completed).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Νόημα Ζωής — 28 Ημέρες</h1>
            <p className="text-sm text-gray-400">Πρακτική εφαρμογή αυτοβελτίωσης • Dark mode</p>
          </div>
          <div className="text-right">
            <p className="text-sm">Πρόοδος</p>
            <div className="w-36 bg-gray-800 rounded-full overflow-hidden mt-2">
              <div
                className="h-2 bg-emerald-400"
                style={{ width: `${(completedCount / 28) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">{completedCount}/28 ολοκληρωμένες</p>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left: Days list */}
          <aside className="md:col-span-1 bg-gray-800 p-3 rounded-lg">
            <h2 className="text-sm font-medium mb-3">Ημέρες</h2>
            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
              {DAYS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setCurrentDay(d.id)}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between hover:bg-gray-700 transition-colors ${
                    currentDay === d.id ? "bg-gray-700" : ""
                  }`}
                >
                  <div>
                    <div className="text-sm">{`Ημέρα ${d.id}`}</div>
                    <div className="text-xs text-gray-400">{DAY_TASKS[d.id - 1]}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {completed[d.id] ? (
                      <span className="text-emerald-400 text-sm">✔️</span>
                    ) : (
                      <span className="text-gray-500 text-sm">○</span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  // mark all as incomplete
                  setCompleted({});
                }}
                className="flex-1 bg-gray-700 py-2 rounded-md text-sm hover:bg-gray-600"
              >
                Επαναφορά
              </button>
              <button
                onClick={() => {
                  const all = {};
                  for (let i = 1; i <= 28; i++) all[i] = true;
                  setCompleted(all);
                }}
                className="flex-1 bg-emerald-500 text-gray-900 py-2 rounded-md text-sm hover:opacity-90"
              >
                Όλα ολοκληρωμένα
              </button>
            </div>

            <div className="mt-4 text-xs text-gray-400">
              <p>Tip: Αγγίξε μια ημέρα για να δεις την άσκηση και να προσθέσεις τις σκέψεις σου.</p>
            </div>
          </aside>

          {/* Right: Day detail */}
          <section className="md:col-span-2 bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm text-gray-400">{getWeekTitle(currentDay)}</div>
                <h3 className="text-xl font-semibold mt-1">{`Ημέρα ${currentDay}`}</h3>
                <p className="mt-2 text-gray-300">{DAY_TASKS[currentDay - 1]}</p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => toggleComplete(currentDay)}
                  className={`px-3 py-2 rounded-md text-sm ${
                    completed[currentDay] ? "bg-emerald-400 text-gray-900" : "bg-gray-700"
                  }`}
                >
                  {completed[currentDay] ? "Ολοκληρώθηκε" : "Σήμανση ως ολοκληρωμένη"}
                </button>
                <div className="text-xs text-gray-400">{completed[currentDay] ? "✔️" : "○"}</div>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm text-gray-300">Σημειώσεις / Σκέψεις</label>
              <textarea
                value={notes[currentDay] || ""}
                onChange={(e) => updateNote(currentDay, e.target.value)}
                placeholder="Γράψε εδώ τις σκέψεις σου..."
                className="w-full mt-2 min-h-[150px] p-3 bg-gray-900 border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => {
                    // quick gratitude prompt
                    const base = notes[currentDay] || "";
                    updateNote(currentDay, base + (base ? "\n\n" : "") + "Ευγνωμοσύνη: Σήμερα ευχαριστώ για...");
                  }}
                  className="bg-gray-700 py-2 px-3 rounded-md text-sm hover:bg-gray-600"
                >
                  Πρόταση: Ευγνωμοσύνη
                </button>
                <button
                  onClick={() => {
                    // quick reflection prompt
                    const base = notes[currentDay] || "";
                    updateNote(currentDay, base + (base ? "\n\n" : "") + "Αναστοχασμός: Τι έμαθα σήμερα...");
                  }}
                  className="bg-gray-700 py-2 px-3 rounded-md text-sm hover:bg-gray-600"
                >
                  Πρόταση: Αναστοχασμός
                </button>

                <button
                  onClick={() => {
                    const copy = { ...notes };
                    copy[currentDay] = "";
                    setNotes(copy);
                  }}
                  className="ml-auto bg-red-600 py-2 px-3 rounded-md text-sm hover:opacity-90"
                >
                  Καθαρισμός
                </button>
              </div>

              <div className="mt-4 text-xs text-gray-400">
                <p>Μπορείς να επιστρέψεις ανά πάσα στιγμή — ό,τι γράφεις αποθηκεύεται τοπικά στο κινητό/πρόγραμμα περιήγησης.</p>
              </div>
            </div>

            <div className="mt-6 border-t border-gray-800 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setCurrentDay((d) => Math.max(1, d - 1))}
                className="w-full bg-gray-700 py-2 rounded-md"
              >
                ← Προηγούμενη
              </button>
              <button
                onClick={() => setCurrentDay((d) => Math.min(28, d + 1))}
                className="w-full bg-emerald-500 text-gray-900 py-2 rounded-md"
              >
                Επόμενη →
              </button>
            </div>
          </section>
        </main>

        <footer className="mt-6 text-center text-xs text-gray-500">
          <p>Δημιουργήθηκε για σένα — μικρά βήματα, μεγάλο νόημα.</p>
        </footer>
      </div>
    </div>
  );
}

function getWeekTitle(day) {
  if (day >= 1 && day <= 7) return WEEK_TITLES[0];
  if (day >= 8 && day <= 14) return WEEK_TITLES[1];
  if (day >= 15 && day <= 21) return WEEK_TITLES[2];
  return WEEK_TITLES[3];
}
