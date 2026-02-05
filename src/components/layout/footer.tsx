export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8 mt-auto">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Web Programming Hack Blog. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
