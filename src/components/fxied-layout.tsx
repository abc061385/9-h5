// 上下固定，中间滚动布局
interface FixedLayoutProps {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}

export function FixedLayout({ header, footer, children }: FixedLayoutProps) {
  return (
    <div className="flex flex-col size-full">
      <header className="">{header}</header>
      <main className="grow relative">
        <div className="size-full absolute top-0 left-0 overflow-y-scroll no-scrollbar touch-scroll flex flex-col">
          {children}
        </div>
      </main>
      <footer className="shrink-0">{footer}</footer>
    </div>
  );
}
