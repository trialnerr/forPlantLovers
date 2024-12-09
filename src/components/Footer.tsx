function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 z-20 w-full p-4 border-t border-white shadow-lg md:flex md:items-center md:justify-between md:p-6">
      <span className="text-sm text-darkGreen sm:text-center mx-auto">
        Made with ❤️ by{" "}
        <a
          href="https://github.com/trialnerr"
          className="underline hover:text-lightGreen"
          target="_blank"
        >
          Bongi Sibanda.
        </a>{" "}
      </span>
      
    </footer>
  );
}

export default Footer;
