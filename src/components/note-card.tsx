export function NoteCard() {
  return (
    <div className="rounded-md bg-slate-800 p-5 space-y-3 overflow-hidden relative">
      <span className="text-sm font-medium text-slate-200">2 days ago</span>
      <p className="text-sm leading-6 text-slate-300">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse est
        dolorum culpa libero obcaecati odio necessitatibus quae earum minus
        corporis, eligendi optio tenetur! Molestias accusamus dolores vitae
        deleniti quibusdam esse?
      </p>
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
    </div>
  );
}
