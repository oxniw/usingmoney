
export default function HiddenBackground() {
    return (
      <div className="absolute inset-0 bg-cover bg-center bg-[url('/secret.jpg')]">
        <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
          Hidden Content!
        </div>
      </div>
    );
  }
  