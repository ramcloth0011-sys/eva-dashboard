import React, { useState, useRef } from "react";
import {
  Shirt,
  Plus,
  Image as ImageIcon,
  Video,
  Instagram,
  Facebook,
  Mail,
  Check,
  X,
  Clock,
  Sparkles,
  Loader2,
  ChevronRight,
  Layers,
  Link2,
} from "lucide-react";

const STATUS = {
  queued: { label: "Queue mein", color: "bg-stone-200 text-stone-700" },
  generating: { label: "Ban raha hai", color: "bg-amber-100 text-amber-800" },
  review: { label: "Approval baaki", color: "bg-indigo-100 text-indigo-800" },
  posting: { label: "Post ho raha hai", color: "bg-amber-100 text-amber-800" },
  posted: { label: "Post ho gaya", color: "bg-emerald-100 text-emerald-800" },
  rejected: { label: "Reject kiya gaya", color: "bg-rose-100 text-rose-800" },
};

const seedTasks = [
  {
    id: "t1",
    title: "Sunset Ochre Oversized Tee",
    brief: "Mustard oversized tee, model studio shot, golden hour light",
    needsImage: true,
    needsModel: true,
    needsVideo: true,
    postIg: true,
    postFb: true,
    caption:
      "Golden hour, golden fit. The Sunset Ochre tee is built for slow evenings and long shadows.",
    hashtags: "#ElevateOutfit #OversizedTee #StreetStyleIndia",
    status: "review",
    swatch: "from-amber-300 to-orange-500",
  },
  {
    id: "t2",
    title: "Midnight Charcoal Crew",
    brief: "Charcoal crew neck, minimal chest logo, model walking shot",
    needsImage: true,
    needsModel: true,
    needsVideo: false,
    postIg: true,
    postFb: false,
    caption: "Charcoal never goes out of style. Minimal cut, maximum wear.",
    hashtags: "#ElevateOutfit #MinimalStyle #Charcoal",
    status: "posted",
    swatch: "from-stone-500 to-stone-800",
  },
  {
    id: "t3",
    title: "Coral Reef Graphic Tee",
    brief: "Coral graphic print, model lifestyle shot near a wall mural",
    needsImage: true,
    needsModel: true,
    needsVideo: true,
    postIg: true,
    postFb: true,
    caption: "",
    hashtags: "",
    status: "generating",
    swatch: "from-rose-300 to-orange-400",
  },
];

function StatusBadge({ status }) {
  const s = STATUS[status];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${s.color}`}>
      {status === "generating" || status === "posting" ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : status === "posted" ? (
        <Check className="h-3 w-3" />
      ) : status === "rejected" ? (
        <X className="h-3 w-3" />
      ) : (
        <Clock className="h-3 w-3" />
      )}
      {s.label}
    </span>
  );
}

function Swatch({ className, children }) {
  return (
    <div className={`relative flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br ${className}`}>
      <Shirt className="h-10 w-10 text-white/90" strokeWidth={1.5} />
      {children}
    </div>
  );
}

function Sidebar({ view, setView, pendingCount }) {
  const items = [
    { id: "home", label: "Home", icon: Sparkles },
    { id: "new", label: "Naya task", icon: Plus },
    { id: "tasks", label: "Sab tasks", icon: Layers },
    { id: "review", label: "Approval", icon: Check, badge: pendingCount },
    { id: "connections", label: "Connections", icon: Link2 },
  ];
  return (
    <aside className="flex h-full w-56 shrink-0 flex-col justify-between bg-stone-900 px-4 py-6 text-stone-100">
      <div>
        <div className="mb-8 flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400 text-stone-900 font-bold">
            E
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">EVA</p>
            <p className="text-xs leading-tight text-stone-400">Elevate Outfit</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = view === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                  active ? "bg-stone-800 text-white" : "text-stone-300 hover:bg-stone-800/60"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </span>
                {item.badge ? (
                  <span className="rounded-full bg-amber-400 px-1.5 text-xs font-semibold text-stone-900">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="rounded-lg bg-stone-800 px-3 py-3 text-xs text-stone-400">
        Approval ke bina EVA kabhi post nahi karegi.
      </div>
    </aside>
  );
}

function Home({ tasks, setView, setNewTaskOpen }) {
  const pending = tasks.filter((t) => t.status === "review").length;
  const posted = tasks.filter((t) => t.status === "posted").length;
  const active = tasks.filter((t) => t.status === "generating" || t.status === "posting").length;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 rounded-2xl border border-stone-200 bg-white p-8">
        <p className="text-sm font-medium text-amber-700">Namaste</p>
        <h1 className="mt-1 text-2xl font-semibold text-stone-900">
          Hi, I'm EVA — I work for Elevate Outfit.
        </h1>
        <p className="mt-2 max-w-md text-sm text-stone-600">
          Task de dijiye, design se lekar Instagram post tak main sambhal loongi — lekin post karne se
          pehle hamesha aapse approval loongi.
        </p>
        <button
          onClick={() => setView("new")}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-800"
        >
          <Plus className="h-4 w-4" /> Naya task banayein
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <p className="text-xs text-stone-500">Approval baaki</p>
          <p className="mt-1 text-2xl font-semibold text-stone-900">{pending}</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <p className="text-xs text-stone-500">Chal raha hai</p>
          <p className="mt-1 text-2xl font-semibold text-stone-900">{active}</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <p className="text-xs text-stone-500">Is hafte post hue</p>
          <p className="mt-1 text-2xl font-semibold text-stone-900">{posted}</p>
        </div>
      </div>

      {pending > 0 && (
        <button
          onClick={() => setView("review")}
          className="mt-6 flex w-full items-center justify-between rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-left text-sm text-indigo-900 hover:bg-indigo-100"
        >
          <span>{pending} post{pending > 1 ? "s" : ""} aapke approval ka wait kar rahe hain</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

function NewTask({ addTask, setView }) {
  const [form, setForm] = useState({
    title: "",
    brief: "",
    needsImage: true,
    needsModel: true,
    needsVideo: false,
    postIg: true,
    postFb: false,
    caption: "",
    hashtags: "",
  });
  const [error, setError] = useState("");

  const toggle = (key) => setForm((f) => ({ ...f, [key]: !f[key] }));

  const submit = () => {
    if (!form.title.trim() || !form.brief.trim()) {
      setError("Title aur design brief dono bharna zaroori hai.");
      return;
    }
    addTask(form);
    setView("tasks");
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-1 text-lg font-semibold text-stone-900">Naya task</h2>
      <p className="mb-6 text-sm text-stone-600">
        Bata dijiye kya banana hai — EVA image se lekar caption tak sab prepare karegi, approval ke liye bhejegi.
      </p>

      <div className="space-y-5 rounded-2xl border border-stone-200 bg-white p-6">
        <div>
          <label className="mb-1 block text-sm font-medium text-stone-800">Design ka naam</label>
          <input
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Sunset Ochre Oversized Tee"
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-stone-800">Design brief</label>
          <textarea
            value={form.brief}
            onChange={(e) => setForm((f) => ({ ...f, brief: e.target.value }))}
            placeholder="Rang, print, model shot ka style, background — jitna detail utna behtar"
            rows={3}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-stone-800">EVA kya kare</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              ["needsImage", "T-shirt ka design image", ImageIcon],
              ["needsModel", "Model ko pehnaye", Shirt],
              ["needsVideo", "Video bhi banaye", Video],
              ["postIg", "Instagram par post", Instagram],
              ["postFb", "Facebook par post", Facebook],
            ].map(([key, label, Icon]) => (
              <button
                type="button"
                key={key}
                onClick={() => toggle(key)}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm ${
                  form[key]
                    ? "border-stone-900 bg-stone-900 text-white"
                    : "border-stone-300 text-stone-600 hover:border-stone-400"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-stone-800">
            Caption <span className="font-normal text-stone-400">(khali chhodein, EVA khud likh degi)</span>
          </label>
          <input
            value={form.caption}
            onChange={(e) => setForm((f) => ({ ...f, caption: e.target.value }))}
            placeholder="Ya apni pasand ki caption likhein"
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-stone-800">Hashtags</label>
          <input
            value={form.hashtags}
            onChange={(e) => setForm((f) => ({ ...f, hashtags: e.target.value }))}
            placeholder="#ElevateOutfit #StreetStyle"
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
          />
        </div>

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <button
          onClick={submit}
          className="w-full rounded-lg bg-stone-900 py-2.5 text-sm font-medium text-white hover:bg-stone-800"
        >
          EVA ko task de dijiye
        </button>
      </div>
    </div>
  );
}

function TaskCard({ task, onOpen }) {
  return (
    <button
      onClick={() => onOpen(task)}
      className="flex w-full items-center gap-4 rounded-xl border border-stone-200 bg-white p-3 text-left hover:border-stone-300"
    >
      <div className="h-14 w-14 shrink-0">
        <Swatch className={task.swatch} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-stone-900">{task.title}</p>
        <p className="truncate text-xs text-stone-500">{task.brief}</p>
      </div>
      <StatusBadge status={task.status} />
    </button>
  );
}

function TaskList({ tasks, onOpen }) {
  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-4 text-lg font-semibold text-stone-900">Sab tasks</h2>
      <div className="space-y-3">
        {tasks.map((t) => (
          <TaskCard key={t.id} task={t} onOpen={onOpen} />
        ))}
        {tasks.length === 0 && (
          <p className="rounded-xl border border-dashed border-stone-300 p-8 text-center text-sm text-stone-500">
            Abhi koi task nahi hai. "Naya task" se shuru karein.
          </p>
        )}
      </div>
    </div>
  );
}

function ReviewQueue({ tasks, onOpen }) {
  const pending = tasks.filter((t) => t.status === "review");
  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-1 text-lg font-semibold text-stone-900">Approval</h2>
      <p className="mb-4 text-sm text-stone-600">
        Yeh posts ready hain. Dekh kar approve ya reject karein.
      </p>
      <div className="space-y-3">
        {pending.map((t) => (
          <TaskCard key={t.id} task={t} onOpen={onOpen} />
        ))}
        {pending.length === 0 && (
          <p className="rounded-xl border border-dashed border-stone-300 p-8 text-center text-sm text-stone-500">
            Approval ke liye abhi kuch pending nahi hai.
          </p>
        )}
      </div>
    </div>
  );
}

function TaskDetail({ task, onClose, onApprove, onReject }) {
  const [rejectOpen, setRejectOpen] = useState(false);
  const [note, setNote] = useState("");

  if (!task) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-stone-900/40 p-4">
      <div className="max-h-full w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold text-stone-900">{task.title}</h3>
            <div className="mt-1"><StatusBadge status={task.status} /></div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-4 h-56 w-full">
          <Swatch className={task.swatch}>
            {(task.status === "generating") && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-stone-900/40">
                <Loader2 className="h-6 w-6 animate-spin text-white" />
              </div>
            )}
          </Swatch>
        </div>

        <p className="mb-3 text-sm text-stone-600">{task.brief}</p>

        {task.status === "generating" && (
          <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
            EVA image aur caption taiyaar kar rahi hai — thodi der mein yahaan dikhega.
          </p>
        )}

        {(task.status === "review" || task.status === "posting" || task.status === "posted") && (
          <div className="space-y-3 rounded-xl border border-stone-200 p-4">
            <div>
              <p className="text-xs font-medium text-stone-500">Caption</p>
              <p className="text-sm text-stone-800">{task.caption || "—"}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-stone-500">Hashtags</p>
              <p className="text-sm text-indigo-700">{task.hashtags || "—"}</p>
            </div>
            <div className="flex gap-2 pt-1 text-xs text-stone-500">
              {task.postIg && (
                <span className="flex items-center gap-1"><Instagram className="h-3.5 w-3.5" /> Instagram</span>
              )}
              {task.postFb && (
                <span className="flex items-center gap-1"><Facebook className="h-3.5 w-3.5" /> Facebook</span>
              )}
            </div>
          </div>
        )}

        {task.status === "review" && !rejectOpen && (
          <div className="mt-5 flex gap-2">
            <button
              onClick={() => onApprove(task.id)}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
            >
              <Check className="h-4 w-4" /> Approve aur post karein
            </button>
            <button
              onClick={() => setRejectOpen(true)}
              className="flex items-center justify-center gap-2 rounded-lg border border-stone-300 px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50"
            >
              <X className="h-4 w-4" /> Reject
            </button>
          </div>
        )}

        {rejectOpen && (
          <div className="mt-5 space-y-2">
            <label className="text-sm font-medium text-stone-800">Kya badalna hai?</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder="Jaise: rang halka karein, caption chhota karein"
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onReject(task.id, note);
                  setRejectOpen(false);
                  setNote("");
                }}
                className="flex-1 rounded-lg bg-rose-600 py-2 text-sm font-medium text-white hover:bg-rose-700"
              >
                Reject confirm karein
              </button>
              <button
                onClick={() => setRejectOpen(false)}
                className="rounded-lg border border-stone-300 px-4 py-2 text-sm text-stone-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {task.status === "posting" && (
          <p className="mt-5 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
            <Loader2 className="h-4 w-4 animate-spin" /> Instagram/Facebook par post ho raha hai...
          </p>
        )}
        {task.status === "posted" && (
          <p className="mt-5 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
            <Check className="h-4 w-4" /> Live post ho gaya.
          </p>
        )}
        {task.status === "rejected" && (
          <p className="mt-5 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-800">
            Reject kar diya gaya. Note: {task.rejectNote || "—"}
          </p>
        )}
      </div>
    </div>
  );
}

function Connections() {
  const rows = [
    { name: "ChatGPT — image design", icon: ImageIcon, status: "Connect karna baaki", connected: false },
    { name: "Gemini — video", icon: Video, status: "Connect karna baaki", connected: false },
    { name: "Instagram — sirf post karna", icon: Instagram, status: "Connect karna baaki", connected: false },
    { name: "Facebook — sirf post karna", icon: Facebook, status: "Connect karna baaki", connected: false },
    { name: "Email — approval alert", icon: Mail, status: "Connect karna baaki", connected: false },
  ];
  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-1 text-lg font-semibold text-stone-900">Connections</h2>
      <p className="mb-6 text-sm text-stone-600">
        Yeh asli automation ke liye chahiye — inhe backend server ke saath connect kiya jaata hai, isliye
        yahaan sirf status dikh raha hai.
      </p>
      <div className="space-y-2">
        {rows.map((r) => {
          const Icon = r.icon;
          return (
            <div
              key={r.name}
              className="flex items-center justify-between rounded-xl border border-stone-200 bg-white px-4 py-3"
            >
              <span className="flex items-center gap-3 text-sm text-stone-800">
                <Icon className="h-4 w-4 text-stone-500" />
                {r.name}
              </span>
              <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs text-stone-600">{r.status}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [tasks, setTasks] = useState(seedTasks);
  const [view, setView] = useState("home");
  const [openTaskId, setOpenTaskId] = useState(null);
  const idCounter = useRef(4);

  const updateTask = (id, patch) =>
    setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, ...patch } : t)));

  const addTask = (form) => {
    const id = "t" + idCounter.current++;
    const swatches = [
      "from-amber-300 to-orange-500",
      "from-indigo-300 to-indigo-600",
      "from-rose-300 to-orange-400",
      "from-stone-500 to-stone-800",
      "from-emerald-300 to-teal-600",
    ];
    const swatch = swatches[Math.floor(Math.random() * swatches.length)];
    const newTask = {
      id,
      title: form.title,
      brief: form.brief,
      needsImage: form.needsImage,
      needsModel: form.needsModel,
      needsVideo: form.needsVideo,
      postIg: form.postIg,
      postFb: form.postFb,
      caption: form.caption,
      hashtags: form.hashtags,
      status: "queued",
      swatch,
    };
    setTasks((ts) => [newTask, ...ts]);

    setTimeout(() => updateTask(id, { status: "generating" }), 700);
    setTimeout(
      () =>
        updateTask(id, {
          status: "review",
          caption:
            form.caption ||
            `${form.title} — jo aapki alag pehchaan banaye. Ab available Elevate Outfit par.`,
          hashtags: form.hashtags || "#ElevateOutfit #NewDrop",
        }),
      2800
    );
  };

  const approve = (id) => {
    updateTask(id, { status: "posting" });
    setTimeout(() => updateTask(id, { status: "posted" }), 1600);
  };

  const reject = (id, note) => {
    updateTask(id, { status: "rejected", rejectNote: note });
  };

  const openTask = (task) => setOpenTaskId(task.id);
  const currentOpen = tasks.find((t) => t.id === openTaskId) || null;
  const pendingCount = tasks.filter((t) => t.status === "review").length;

  return (
    <div className="flex h-screen w-full bg-stone-50 text-stone-900">
      <Sidebar view={view} setView={setView} pendingCount={pendingCount} />
      <main className="flex-1 overflow-y-auto px-8 py-8">
        {view === "home" && <Home tasks={tasks} setView={setView} />}
        {view === "new" && <NewTask addTask={addTask} setView={setView} />}
        {view === "tasks" && <TaskList tasks={tasks} onOpen={openTask} />}
        {view === "review" && <ReviewQueue tasks={tasks} onOpen={openTask} />}
        {view === "connections" && <Connections />}
      </main>
      {currentOpen && (
        <TaskDetail
          task={currentOpen}
          onClose={() => setOpenTaskId(null)}
          onApprove={approve}
          onReject={reject}
        />
      )}
    </div>
  );
}
