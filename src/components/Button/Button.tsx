type ButtonProps = {
  className?: string;
  children: React.ReactNode;
  onClick: () => void;
}

export const Button = ({ className, children, onClick }: ButtonProps) => {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  )
}