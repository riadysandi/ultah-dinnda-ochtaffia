import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Gift,
  Heart,
  Pause,
  Play,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import GamesSection from "./MiniGames";

function FloatingHearts() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 18 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-400/30"
          style={{ left: `${(i * 29) % 100}%`, bottom: -30, fontSize: 14 + (i % 5) * 5 }}
          animate={{ y: [0, -900], x: [0, (i % 2 ? 1 : -1) * 35], opacity: [0, 0.45, 0] }}
          transition={{ duration: 8 + (i % 5), repeat: Infinity, delay: i * 0.45, ease: "linear" }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
}

function LockScreen({ onOpen }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [error, setError] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    // Target: 2001-10-05 (05 Oktober 2001)
    if (selectedDate === "2001-10-05") {
      onOpen();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2200);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-950 via-rose-800 to-purple-950 px-5 text-center"
      exit={{ opacity: 0, scale: 1.08 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.18),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(244,114,182,.24),transparent_28%)]" />
      <motion.form onSubmit={submit} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative max-w-lg">
        <motion.div
          animate={{ scale: [1, 1.14, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-6 text-7xl"
        >
          🎁
        </motion.div>
        <h1 className="font-romantic mb-4 text-5xl text-white drop-shadow md:text-7xl">
          Ada Kejutan Untukmu
        </h1>
        <p className="mx-auto mb-6 text-lg leading-relaxed text-rose-100">
          Pilih tanggal lahir Dinnda untuk membuka kejutan ini 💌
        </p>
        <div className="mb-4 max-w-xs mx-auto">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full rounded-2xl border border-white/30 bg-white/20 px-4 py-3.5 text-center text-base font-semibold text-white shadow-inner outline-none focus:border-white focus:bg-white/30 transition cursor-pointer [color-scheme:dark]"
            required
          />
        </div>
        {error && <p className="mb-4 text-sm font-semibold text-rose-200">Tanggal lahirnya belum tepat nih, coba pilih lagi ya 🧐</p>}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer rounded-full border-0 bg-gradient-to-r from-pink-500 to-rose-500 px-9 py-4 text-lg font-bold text-white shadow-2xl shadow-pink-700/30"
        >
          <Gift className="mr-2 inline -mt-1" size={22} /> Buka Kejutan 🎉
        </motion.button>
      </motion.form>
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="relative z-10 flex min-h-[90vh] items-center justify-center px-5 py-20 text-center">
      <div className="mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="mb-6 text-8xl">
          🎂
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-romantic bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-6xl leading-tight text-transparent md:text-8xl"
        >
          Happy Birthday
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="font-serif-elegant mb-5 text-3xl italic text-slate-700 md:text-5xl"
        >
          Dinnda Ochtaffia
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8 flex items-center justify-center gap-2 text-pink-500"
        >
          <Sparkles size={18} />
          <span className="text-slate-500">Hari ini adalah hari spesialmu</span>
          <Sparkles size={18} />
        </motion.div>
        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-slate-600 md:text-xl">
          Terima kasih sudah hadir di dunia ini dan jadi bagian paling indah dalam hidupku. Semoga hari ini sehangat senyummu dan seindah hatimu. 🌸
        </p>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-pink-400">
          <ChevronDown size={34} className="mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}

function SinglePhotoCard({ src, alt, title, subtitle }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <section className="relative z-10 mx-auto max-w-2xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          {title && <h2 className="font-serif-elegant mb-2 text-3xl text-slate-800 md:text-4xl">{title}</h2>}
          {subtitle && <p className="text-slate-500">{subtitle}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -4 }}
          onClick={() => setOpen(true)}
          className="group cursor-pointer overflow-hidden rounded-3xl border border-pink-100 bg-white p-3 shadow-xl transition duration-300 hover:shadow-2xl hover:shadow-pink-200/50"
        >
          <div className="overflow-hidden rounded-2xl aspect-[4/5] bg-pink-50">
            <img
              src={src}
              alt={alt}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-2xl"
              initial={{ scale: 0.88 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.88 }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute -right-3 -top-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-0 bg-white shadow-lg text-slate-700"
              >
                <X size={20} />
              </button>
              <img src={src} alt={alt} className="max-h-[82vh] w-auto rounded-2xl object-contain shadow-2xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Candle() {
  const [lit, setLit] = useState(true);
  const blow = () => {
    setLit(false);
    confetti({
      particleCount: 220,
      spread: 110,
      origin: { y: 0.58 },
      colors: ["#ec4899", "#f472b6", "#a855f7", "#fbbf24"],
    });
    setTimeout(() => {
      confetti({ particleCount: 90, angle: 60, spread: 70, origin: { x: 0, y: 0.65 } });
      confetti({ particleCount: 90, angle: 120, spread: 70, origin: { x: 1, y: 0.65 } });
    }, 500);
  };
  return (
    <section className="relative z-10 px-4 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-lg"
      >
        <span className="mb-3 block text-5xl">🕯️</span>
        <h2 className="font-serif-elegant mb-3 text-4xl text-slate-800 md:text-5xl">Make a Wish</h2>
        <p className="mb-10 text-slate-500">Pejamkan mata, buat harapan terbaikmu, lalu tiup lilinnya.</p>
        <div className="relative mb-10 inline-block">
          <div className="text-9xl">🎂</div>
          {lit ? (
            <div className="animate-flame absolute -top-6 left-1/2 -translate-x-1/2 text-4xl">🔥</div>
          ) : (
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-3xl opacity-60">💨</div>
          )}
        </div>
        {lit ? (
          <motion.button
            onClick={blow}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer rounded-full border-0 bg-gradient-to-r from-amber-400 to-orange-500 px-10 py-4 text-lg font-bold text-white shadow-xl shadow-orange-300/40"
          >
            Tiup Lilin 🌬️
          </motion.button>
        ) : (
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-romantic mb-2 text-4xl text-pink-600">Semoga doamu terkabulkan! ✨</p>
            <p className="text-slate-500">Aamiin... selamat ulang tahun sayangku 🎉💖</p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

function LoveLetter() {
  const [opened, setOpened] = useState(false);
  return (
    <section className="relative z-10 px-4 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl"
      >
        <span className="mb-3 block text-5xl">💌</span>
        <h2 className="font-serif-elegant mb-3 text-4xl text-slate-800 md:text-5xl">Surat Cinta Untukmu</h2>
        <p className="mb-10 text-slate-500">Ada pesan kecil yang ingin kusampaikan.</p>
        {!opened ? (
          <motion.button
            onClick={() => setOpened(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer rounded-full border-0 bg-gradient-to-r from-rose-500 to-pink-500 px-10 py-4 text-lg font-bold text-white shadow-xl shadow-pink-300/40"
          >
            Buka Surat 💌
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[2rem] border border-pink-100 bg-white/85 p-7 text-left leading-relaxed text-slate-700 shadow-2xl backdrop-blur md:p-11"
          >
            <p className="font-romantic mb-6 text-3xl text-pink-600">Untuk Dinnda Ochtaffia tersayang,</p>
            <p className="mb-4">
              Di hari spesialmu ini, aku ingin kamu tahu bahwa kehadiranmu adalah hadiah terbesar dalam hidupku. Setiap hari bersamamu terasa lebih hangat, lebih ringan, dan lebih berarti.
            </p>
            <p className="mb-4">
              Terima kasih sudah menjadi tempat pulang yang paling nyaman. Terima kasih untuk sabar, tawa, perhatian, dan cara kamu membuat hal sederhana terasa istimewa.
            </p>
            <p className="mb-4">
              Aku berdoa semoga Allah selalu menjagamu, memberimu kesehatan, kebahagiaan, rezeki yang baik, dan jalan yang dimudahkan untuk semua mimpi indahmu.
            </p>
            <p className="font-romantic pt-3 text-2xl text-pink-600">
              Selamat ulang tahun, sayangku. I love you more than words can say. 💖
            </p>
            <p className="font-romantic mt-8 text-right text-2xl text-rose-500">— Dari orang yang paling menyayangimu ❤️</p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

function WishWall() {
  const [wishes, setWishes] = useState(() => {
    const saved = localStorage.getItem("dinnda_wishes");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [];
  });

  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;

    const newWish = {
      name: name.trim(),
      msg: msg.trim(),
      time: "Baru saja",
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem("dinnda_wishes", JSON.stringify(updated));
    setName("");
    setMsg("");
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 } });
  };

  return (
    <section className="relative z-10 mx-auto max-w-2xl px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 text-center"
      >
        <span className="mb-2 block text-5xl">📝</span>
        <h2 className="font-serif-elegant mb-2 text-3xl text-slate-800 md:text-4xl">
          Make a Wish Wall
        </h2>
        <p className="text-slate-500 text-sm md:text-base">
          Titip doa & ucapan ulang tahun terbaik kamu untuk Dinnda di sini!
        </p>
      </motion.div>

      <div className="rounded-3xl border border-pink-100 bg-white p-6 md:p-8 shadow-xl mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Kamu</label>
            <input
              type="text"
              placeholder="Contoh: Teman SMA / Sarah"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-pink-200 px-4 py-2.5 text-sm outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Doa & Ucapan</label>
            <textarea
              rows="3"
              placeholder="Tulis ucapan atau doa tulus kamu untuk Dinnda..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="w-full rounded-xl border border-pink-200 px-4 py-2.5 text-sm outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition"
              required
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full cursor-pointer rounded-xl border-0 bg-gradient-to-r from-pink-500 to-rose-500 py-3 text-sm font-bold text-white shadow-lg shadow-pink-400/30 flex items-center justify-center gap-2"
          >
            <Send size={16} /> Kirim Ucapan 💌
          </motion.button>
        </form>
      </div>

      <div className="space-y-4">
        {wishes.length === 0 && (
          <div className="rounded-2xl border border-dashed border-pink-200 bg-white/70 p-6 text-center text-sm text-slate-400">
            Belum ada ucapan. Jadilah yang pertama ngucapin untuk Dinnda 💌
          </div>
        )}
        {wishes.map((w, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-pink-100 bg-white/90 backdrop-blur p-4 shadow-md flex items-start gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-rose-400 text-white font-bold text-sm">
              {w.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-sm text-slate-800">{w.name}</h4>
                <span className="text-[11px] text-slate-400">{w.time}</span>
              </div>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">{w.msg}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function LoveCounter() {
  const [likes, setLikes] = useState(() => {
    return parseInt(localStorage.getItem("dinnda_love_count") || "0", 10);
  });
  const [floatingLikes, setFloatingLikes] = useState([]);

  const addLike = () => {
    const newCount = likes + 1;
    setLikes(newCount);
    localStorage.setItem("dinnda_love_count", newCount.toString());

    const id = Date.now() + Math.random();
    setFloatingLikes((prev) => [...prev.slice(-10), { id, x: Math.random() * 40 - 20 }]);
  };

  return (
    <section className="relative z-10 mx-auto max-w-md px-4 py-12 text-center">
      <div className="rounded-3xl border border-pink-100 bg-white/90 backdrop-blur p-6 shadow-xl">
        <p className="text-xs uppercase tracking-wider text-pink-500 font-bold mb-2">Kirim Cinta Virtual</p>
        <p className="text-xs text-slate-500 mb-4">Tap tombol hati sebanyak-banyaknya untuk Dinnda!</p>

        <div className="relative inline-block">
          <motion.button
            onClick={addLike}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.85 }}
            className="cursor-pointer rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 p-5 text-white shadow-xl shadow-pink-400/50 border-0"
          >
            <Heart size={32} fill="currentColor" />
          </motion.button>

          {floatingLikes.map((fl) => (
            <motion.span
              key={fl.id}
              initial={{ y: 0, opacity: 1, scale: 1 }}
              animate={{ y: -80, opacity: 0, scale: 1.5, x: fl.x }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              onAnimationComplete={() => setFloatingLikes((prev) => prev.filter((item) => item.id !== fl.id))}
              className="absolute top-0 left-1/2 -translate-x-1/2 text-2xl pointer-events-none text-rose-500"
            >
              💖
            </motion.span>
          ))}
        </div>

        <p className="mt-4 text-base font-bold text-slate-700">
          <span className="text-pink-600 text-xl">{likes}</span> Cinta Terkirim 🥰
        </p>
      </div>
    </section>
  );
}

function MusicPlayer({ startSignal }) {
  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const getAudio = () => {
    const nextAudio = audio || new Audio("/jamrud-selamat-ulang-tahun.mp3");
    nextAudio.loop = true;
    nextAudio.volume = 0.42;
    if (!audio) setAudio(nextAudio);
    return nextAudio;
  };

  const togglePlay = async () => {
    const music = getAudio();
    if (playing) {
      music.pause();
      setPlaying(false);
    } else {
      await music.play().catch(() => {});
      setPlaying(true);
    }
  };

  const toggleMute = () => {
    const music = getAudio();
    music.muted = !muted;
    setMuted(!muted);
  };

  useEffect(() => {
    if (startSignal) {
      setTimeout(() => togglePlay(), 300);
    }
  }, [startSignal]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-5 right-5 z-40 rounded-full border border-pink-200 bg-white/90 px-4 py-2 shadow-2xl backdrop-blur"
    >
      <div className="flex items-center gap-2">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg ${playing ? "animate-vinyl" : ""}`}
        >
          <div className="h-3 w-3 rounded-full bg-white" />
        </div>
        <button
          onClick={togglePlay}
          className="cursor-pointer rounded-full border-0 bg-transparent p-2 hover:bg-pink-100"
        >
          {playing ? <Pause className="text-pink-600" size={20} /> : <Play className="text-pink-600" size={20} />}
        </button>
        <button
          onClick={toggleMute}
          className="cursor-pointer rounded-full border-0 bg-transparent p-2 hover:bg-pink-100"
        >
          {muted ? <VolumeX className="text-slate-400" size={18} /> : <Volume2 className="text-pink-600" size={18} />}
        </button>
        <span className="hidden text-xs font-semibold text-pink-500 sm:block">
          {playing ? "Now Playing ♫" : "Play Music"}
        </span>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [unlocked, setUnlocked] = useState(false);

  const openSurprise = () => {
    setUnlocked(true);
    confetti({
      particleCount: 180,
      spread: 100,
      origin: { y: 0.55 },
      colors: ["#ec4899", "#f472b6", "#a855f7", "#fbbf24"],
    });
  };

  return (
    <>
      <AnimatePresence>{!unlocked && <LockScreen onOpen={openSurprise} />}</AnimatePresence>
      {unlocked && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50"
        >
          <FloatingHearts />
          <Hero />
          <div className="max-w-4xl mx-auto px-4"><hr className="border-pink-200/80" /></div>

          {/* 1 FOTO UTAMA */}
          <SinglePhotoCard
            src="/foto-utama.jpg"
            alt="Foto Utama Dinnda"
            title="Our Special Moment"
            subtitle="Momen berharga di hari spesialmu"
          />

          <div className="max-w-4xl mx-auto px-4"><hr className="border-pink-200/80" /></div>

          {/* BIRTHDAY MINI GAMES (Pilihan Game + Modal + Kunci Tanggal Lahir) */}
          <GamesSection />

          <div className="max-w-4xl mx-auto px-4"><hr className="border-pink-200/80" /></div>

          {/* TIUP LILIN */}
          <Candle />

          <div className="max-w-4xl mx-auto px-4"><hr className="border-pink-200/80" /></div>

          {/* SURAT CINTA */}
          <LoveLetter />

          <div className="max-w-4xl mx-auto px-4"><hr className="border-pink-200/80" /></div>

          {/* MAKE A WISH WALL UNTUK TEMAN-TEMAN */}
          <WishWall />

          <div className="max-w-4xl mx-auto px-4"><hr className="border-pink-200/80" /></div>

          {/* LOVE COUNTER */}
          <LoveCounter />

          <footer className="relative z-10 py-12 text-center">
            <div className="mb-3 flex justify-center gap-2 text-pink-500">
              <Heart size={16} fill="currentColor" />
              <Heart size={22} fill="currentColor" />
              <Heart size={16} fill="currentColor" />
            </div>
            <p className="font-romantic text-3xl text-pink-600">Made with love for Dinnda Ochtaffia</p>
            <p className="mt-2 text-sm text-slate-400">Happy Birthday 💖</p>
          </footer>

          <MusicPlayer startSignal={unlocked} />
        </motion.main>
      )}
    </>
  );
}
