import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from 'sonner';

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void; 
}

export function NewNoteCard({ onNoteCreated } : NewNoteCardProps) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [content, setContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  function handleStartEditor() {
    setShouldShowOnboarding(false);
  }

  //when the user erases the keyboard it will show the onboarding button
  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
    
    if (event.target.value === '') {
      setShouldShowOnboarding(true);
    }
  }

  //saving the new note
  function handleSaveNote(event: FormEvent) {
    event.preventDefault();

    if (content === '') {
      toast.error('Please add some content before saving.'); // Alert for empty content
      return //Prevents creating a note with empty content.
    }
  
    onNoteCreated(content);

    setContent('');
    setShouldShowOnboarding(true);

    toast.success('New note saved successfully!');
  }

  function handleStartRecording(){
      const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window
      || 'webkitSpeechRecognition' in window

      if (!isSpeechRecognitionAPIAvailable) { 
        alert('Unfortunately, your browser does not support the navigation API.')
      return//so that no code below this executes
      }

      setIsRecording(true);
      setShouldShowOnboarding(false);

      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition //intall ( npm install -D @types/dom-speech-recognition)
      
      const speechRecognition = new SpeechRecognitionAPI();

      speechRecognition.lang = 'en-GB, en-US, pt-BR';
      speechRecognition.continuous = true; //Will not stop to recording until you say manually to do so.
      speechRecognition.maxAlternatives = 1; //Bring only one alternative word, when it`s dont understand what I am saying.
      speechRecognition.interimResults = true; //Bring the results of the text as I speak.
    
      speechRecognition.onresult = (event) => {
        const transcription = Array.from(event.results).reduce((text, result) => {
            return text.concat(result[0].transcript);
        }, '');

        setContent(transcription);
      }

      speechRecognition.onerror = (event) => {
        console.error(event);
    }

      speechRecognition.start();
    }

  function setStopRecording() {
    setIsRecording(false);

    toast.success('New note saved successfully!');
  }


  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md flex flex-col bg-slate-700 p-5 gap-3 autline-none text-left hover:ring-2 hover:ring-slate-600 focus:ring-2 focus:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">New note</span>
        <p className="text-sm leading-6 text-slate-400">
          Record an audio note that will be automatically converted to text.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col autline-none">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

          <form className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                New note
              </span>
              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Begin by{" "}
                  <button 
                  type="button" 
                  onClick={handleStartRecording} 
                  className="font-medium text-lime-400 hover:underline"
                  >
                    recording an audio note
                  </button>{" "}
                    or, if you prefer,{" "}
                  <button
                    type="button"
                    onClick={handleStartEditor}
                    className="font-medium text-lime-400 hover:underline"
                  >
                    simply use text
                  </button>
                  .
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                  onChange={handleContentChanged} //when the use erase the text come back to the onboard
                  value={content}
                  />
              )}
            </div>
                {isRecording ? (
                  <button
                  type="button"
                  onClick={setStopRecording}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium"
                >
                  <div className="size-3  rounded-full bg-red-600 animate-pulse"/>
                  Recording! (click to stop)                  
                </button>
                ) : (
                  <button
              type="button"
              onClick={handleSaveNote}
              className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500"
            >
              Save note
            </button>
                )} 
            </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
