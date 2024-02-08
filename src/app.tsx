import logo from "./assets/Logo.svg";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

export function App() {
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 p-5">
      <img src={logo} alt="NLW Expert" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Search in your notes..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
        />
      </form>

      <div className="h-px bg-slate-700" />
      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard />
        <NoteCard note={{ //tem duas chaves porque a amarela representa o objeto e a de fora azul deve ser usada toda vez que se deseja (no react) colocar um codigo (variavel) javascript dentro do HTML. 
          date: new Date(),
          content: "Hello world!"
        }} />        
      </div>
    </div>
  );
}
