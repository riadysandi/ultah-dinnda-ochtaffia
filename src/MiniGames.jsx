import { useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const gameList = [
  { id: "balloon", icon: "🎈", title: "Balon Terbang", desc: "Klik 15 balon bergerak sebelum waktu habis" },
  { id: "cake", icon: "🧁", title: "Tangkap Kue", desc: "Tangkap 12 kue, hindari bom" },
  { id: "memory", icon: "🃏", title: "Memory Card", desc: "Cocokkan semua pasangan kartu" },
  { id: "emoji", icon: "🧠", title: "Tebak Emoji", desc: "Jawab cepat emoji ulang tahun" },
  { id: "trivia", icon: "🎓", title: "Trivia Dinnda", desc: "Jawab kuis fakta Dinnda" },
  { id: "word", icon: "🔤", title: "Susun Kata", desc: "Susun kata acak ucapan ultah" },
  { id: "heart", icon: "💖", title: "Tangkap Hati", desc: "Klik 20 hati yang bergerak acak" },
  { id: "candle", icon: "🕯️", title: "Padamkan Lilin", desc: "Padamkan 12 lilin secepatnya" },
];

function Result({ win, title, detail, onRetry }) {
  useEffect(() => {
    if (win) confetti({ particleCount: 140, spread: 90, origin: { y: 0.65 } });
  }, [win]);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
      <img
        src={win ? "/game/menang.jpg" : "/game/kalah.jpg"}
        alt={win ? "Menang" : "Kalah"}
        className="mx-auto mb-4 max-h-60 rounded-2xl object-contain shadow-lg border border-pink-100"
      />
      <h4 className={`font-romantic text-3xl mb-1 ${win ? "text-pink-600" : "text-slate-600"}`}>{title}</h4>
      <p className="mb-5 text-sm text-slate-500">{detail}</p>
      <button
        type="button"
        onClick={onRetry}
        className="cursor-pointer rounded-full border-0 bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-pink-400/30"
      >
        Main Lagi 🔄
      </button>
    </motion.div>
  );
}

function BalloonGame() {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(20);
  const [items, setItems] = useState([]);
  const [done, setDone] = useState(false);
  const target = 15;

  useEffect(() => {
    if (done) return;
    const tick = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          setDone(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    const spawn = setInterval(() => {
      setItems((xs) => [
        ...xs.slice(-14),
        {
          id: Math.random().toString(),
          left: Math.random() * 82 + 5,
          size: Math.random() * 16 + 26,
          speed: Math.random() * 2 + 2.8,
        },
      ]);
    }, 480);
    return () => {
      clearInterval(tick);
      clearInterval(spawn);
    };
  }, [done]);

  const pop = (id) => {
    setItems((xs) => xs.filter((x) => x.id !== id));
    setScore((s) => {
      const next = s + 1;
      if (next >= target) setDone(true);
      return next;
    });
  };

  if (done) {
    return (
      <Result
        win={score >= target}
        title={score >= target ? "Kamu Menang! 🎉" : "Yah, Waktu Habis! 😢"}
        detail={`Skor: ${score} / ${target} balon`}
        onRetry={() => {
          setScore(0);
          setTime(20);
          setItems([]);
          setDone(false);
        }}
      />
    );
  }

  return (
    <div>
      <div className="mb-3 flex justify-between text-sm font-bold">
        <span className="text-pink-600">🎈 {score}/{target}</span>
        <span className="text-slate-500">⏰ {time}s</span>
      </div>
      <div className="relative h-80 overflow-hidden rounded-2xl border border-pink-100 bg-gradient-to-b from-sky-100 to-pink-50">
        {items.map((b) => (
          <motion.button
            key={b.id}
            type="button"
            onClick={() => pop(b.id)}
            initial={{ y: 330 }}
            animate={{ y: -80, x: [0, 16, -12, 6] }}
            transition={{
              y: { duration: b.speed, ease: "linear" },
              x: { duration: 1.4, repeat: Infinity },
            }}
            onAnimationComplete={() => setItems((xs) => xs.filter((x) => x.id !== b.id))}
            style={{ left: `${b.left}%`, fontSize: b.size }}
            className="absolute bottom-0 cursor-pointer border-0 bg-transparent p-0 drop-shadow-lg hover:scale-125 active:scale-75"
          >
            🎈
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function CakeGame() {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(20);
  const [basket, setBasket] = useState(50);
  const [items, setItems] = useState([]);
  const [done, setDone] = useState(false);
  const target = 12;
  const area = useRef(null);

  useEffect(() => {
    if (done) return;
    const tick = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          setDone(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    const spawn = setInterval(() => {
      setItems((xs) => [
        ...xs.slice(-10),
        {
          id: Math.random().toString(),
          left: Math.random() * 85 + 5,
          good: Math.random() > 0.28,
          speed: Math.random() * 1.2 + 2.2,
        },
      ]);
    }, 580);
    return () => {
      clearInterval(tick);
      clearInterval(spawn);
    };
  }, [done]);

  const move = (e) => {
    const rect = area.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    setBasket(Math.max(5, Math.min(95, (x / rect.width) * 100)));
  };

  const caught = (item) => {
    setItems((xs) => xs.filter((x) => x.id !== item.id));
    setScore((s) => {
      const next = Math.max(0, s + (item.good ? 1 : -2));
      if (next >= target) setDone(true);
      return next;
    });
  };

  useEffect(() => {
    items.forEach((x) => {
      if (Math.abs(x.left - basket) < 12) caught(x);
    });
  }, [basket, items]);

  if (done) {
    return (
      <Result
        win={score >= target}
        title={score >= target ? "Kuenya Terkumpul! 🎉" : "Kue Kurang Banyak! 😢"}
        detail={`Skor: ${score} / ${target} kue`}
        onRetry={() => {
          setScore(0);
          setTime(20);
          setItems([]);
          setDone(false);
        }}
      />
    );
  }

  return (
    <div>
      <div className="mb-3 flex justify-between text-sm font-bold">
        <span className="text-pink-600">🧁 {score}/{target}</span>
        <span className="text-slate-500">⏰ {time}s</span>
      </div>
      <div
        ref={area}
        onMouseMove={move}
        onTouchMove={move}
        className="relative h-72 overflow-hidden rounded-2xl border border-pink-100 bg-gradient-to-b from-purple-100 to-pink-50 select-none touch-none"
      >
        {items.map((x) => (
          <motion.div
            key={x.id}
            initial={{ y: -40 }}
            animate={{ y: 290 }}
            transition={{ duration: x.speed, ease: "linear" }}
            onAnimationComplete={() => setItems((xs) => xs.filter((i) => i.id !== x.id))}
            style={{ left: `${x.left}%` }}
            className="absolute text-2xl"
          >
            {x.good ? "🧁" : "💣"}
          </motion.div>
        ))}
        <div style={{ left: `${basket}%` }} className="absolute bottom-2 -translate-x-1/2 text-4xl">
          🧺
        </div>
      </div>
      <p className="mt-2 text-xs text-slate-400">Geser mouse/jari untuk gerakkan keranjang.</p>
    </div>
  );
}

function MemoryGame() {
  const base = ["🎂", "🎈", "💖", "🌸", "⭐", "🎁"];
  const [cards, setCards] = useState(() => [...base, ...base].sort(() => Math.random() - 0.5));
  const [open, setOpen] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  const win = matched.length === cards.length;
  if (win) {
    return (
      <Result
        win
        title="Hebat Banget! 🎉"
        detail={`Selesai dalam ${moves} langkah`}
        onRetry={() => {
          setCards([...base, ...base].sort(() => Math.random() - 0.5));
          setOpen([]);
          setMatched([]);
          setMoves(0);
        }}
      />
    );
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((c, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              if (open.includes(i) || matched.includes(i) || open.length === 2) return;
              const next = [...open, i];
              setOpen(next);
              if (next.length === 2) {
                setMoves((m) => m + 1);
                if (cards[next[0]] === cards[next[1]]) {
                  setMatched((m) => [...m, ...next]);
                  setOpen([]);
                } else {
                  setTimeout(() => setOpen([]), 650);
                }
              }
            }}
            className="aspect-square cursor-pointer rounded-xl border-2 border-pink-200 bg-pink-50 text-2xl font-bold text-pink-400"
          >
            {open.includes(i) || matched.includes(i) ? c : "?"}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-slate-500">Langkah: {moves} | Cocokkan semua kartu untuk menang.</p>
    </div>
  );
}

function QuizGame({ type }) {
  const list =
    type === "emoji"
      ? [
          { q: "🎂 🕯️ 🎈", a: "ulang tahun" },
          { q: "❤️ 💌 🌹", a: "cinta" },
          { q: "📸 🤳 😁", a: "selfie" },
          { q: "✈️ 🏖️ 🌴", a: "liburan" },
          { q: "🧋 🍰 🍩", a: "jajan" },
        ]
      : [
          { q: "Tanggal lahir Dinnda?", a: "5" },
          { q: "Bulan lahir Dinnda?", a: "oktober" },
          { q: "Tahun lahir Dinnda?", a: "2001" },
          { q: "Zodiak Dinnda?", a: "libra" },
          { q: "Tanggal lengkapnya?", a: "5 oktober 2001" },
        ];

  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState("");

  if (step >= list.length) {
    return (
      <Result
        win={score >= 3}
        title={score >= 3 ? "Kuis Lulus! 🎉" : "Belum Berhasil! 😢"}
        detail={`Skor: ${score} / ${list.length}`}
        onRetry={() => {
          setStep(0);
          setScore(0);
          setInput("");
        }}
      />
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (input.trim().toLowerCase() === list[step].a) setScore((s) => s + 1);
        setInput("");
        setStep((s) => s + 1);
      }}
      className="text-center"
    >
      <p className="mb-2 text-xs text-slate-400">Soal {step + 1}/{list.length}</p>
      <p className="mb-5 text-3xl font-bold text-pink-600">{list[step].q}</p>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-xl border border-pink-200 px-3 py-2 text-center text-sm outline-none focus:border-pink-500"
          placeholder="jawaban..."
          required
        />
        <button type="submit" className="cursor-pointer rounded-xl border-0 bg-pink-500 px-4 text-white font-bold">
          ✓
        </button>
      </div>
    </form>
  );
}

function WordGame() {
  const words = ["SELAMAT", "ULANG", "TAHUN", "DINNDA", "BAHAGIA"];
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState("");
  const shuffled = useMemo(() => words.map((w) => w.split("").sort(() => 0.5 - Math.random()).join("")), []);

  if (step >= words.length) {
    return (
      <Result
        win={score >= 4}
        title={score >= 4 ? "Teka-teki Selesai! 🎉" : "Belum Berhasil! 😢"}
        detail={`Skor: ${score} / ${words.length}`}
        onRetry={() => {
          setStep(0);
          setScore(0);
          setInput("");
        }}
      />
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (input.trim().toUpperCase() === words[step]) setScore((s) => s + 1);
        setInput("");
        setStep((s) => s + 1);
      }}
      className="text-center"
    >
      <p className="mb-2 text-xs text-slate-400">Kata {step + 1}/{words.length}</p>
      <p className="mb-5 text-3xl font-bold tracking-[.35em] text-pink-600">{shuffled[step]}</p>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-xl border border-pink-200 px-3 py-2 text-center text-sm uppercase outline-none focus:border-pink-500 font-semibold"
          placeholder="susun kata..."
          required
        />
        <button type="submit" className="cursor-pointer rounded-xl border-0 bg-pink-500 px-4 text-white font-bold">
          ✓
        </button>
      </div>
    </form>
  );
}

function ClickGame({ type }) {
  const target = type === "heart" ? 20 : 12;
  const emoji = type === "heart" ? "💖" : "🕯️";
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(15);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const t = setInterval(() => {
      setTime((v) => {
        if (v <= 1) {
          setDone(true);
          return 0;
        }
        return v - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [done]);

  if (done || score >= target) {
    return (
      <Result
        win={score >= target}
        title={score >= target ? "Kamu Menang! 🎉" : "Waktu Habis! 😢"}
        detail={`Skor: ${score} / ${target}`}
        onRetry={() => {
          setScore(0);
          setTime(15);
          setDone(false);
        }}
      />
    );
  }

  return (
    <div>
      <div className="mb-3 flex justify-between text-sm font-bold">
        <span className="text-pink-600">{score}/{target}</span>
        <span className="text-slate-500">⏰ {time}s</span>
      </div>
      <div className="relative h-72 rounded-2xl border border-pink-100 bg-gradient-to-br from-pink-50 to-purple-50 overflow-hidden">
        <motion.button
          type="button"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          onClick={() => {
            const next = score + 1;
            setScore(next);
            setPos({ x: Math.random() * 80 + 10, y: Math.random() * 70 + 12 });
            if (next >= target) setDone(true);
          }}
          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent text-4xl p-2 active:scale-75"
        >
          {emoji}
        </motion.button>
      </div>
    </div>
  );
}

function MiniGameModal({ type }) {
  if (type === "balloon") return <BalloonGame />;
  if (type === "cake") return <CakeGame />;
  if (type === "memory") return <MemoryGame />;
  if (type === "emoji" || type === "trivia") return <QuizGame type={type} />;
  if (type === "word") return <WordGame />;
  if (type === "heart" || type === "candle") return <ClickGame type={type} />;
  return null;
}

export default function GamesSection() {
  const [active, setActive] = useState(null);

  return (
    <section className="relative z-10 mx-auto max-w-3xl px-4 py-16 text-center">
      <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
        <span className="mb-2 block text-5xl">🎮</span>
        <h2 className="font-serif-elegant mb-2 text-3xl text-slate-800 md:text-4xl">Birthday Mini Games</h2>
        <p className="text-slate-500 text-sm md:text-base">Pilih game seru bertema ulang tahun untuk Dinnda!</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
        {gameList.map((g) => (
          <motion.button
            key={g.id}
            type="button"
            onClick={() => setActive(g)}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="cursor-pointer rounded-2xl border border-pink-100 bg-white p-4 shadow-lg transition hover:border-pink-300 hover:shadow-xl hover:shadow-pink-200/50"
          >
            <span className="mb-2 block text-3xl">{g.icon}</span>
            <h4 className="mb-1 text-sm font-semibold text-slate-800">{g.title}</h4>
            <p className="text-[11px] leading-snug text-slate-500">{g.desc}</p>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-pink-100 bg-white p-6 shadow-2xl md:p-8"
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-0 bg-pink-100 text-pink-600 hover:bg-pink-200"
              >
                <X size={18} />
              </button>
              <div className="mb-5 text-center">
                <span className="mb-1 block text-4xl">{active.icon}</span>
                <h3 className="font-serif-elegant text-xl text-slate-800">{active.title}</h3>
              </div>
              <MiniGameModal type={active.id} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
