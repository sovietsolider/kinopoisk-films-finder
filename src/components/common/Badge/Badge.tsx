import './Badge.scss';

export function Badge({
  iconStyle,
  children,
  value,
}: {
  iconStyle: React.CSSProperties;
  children?: JSX.Element | JSX.Element[] | string;
  value: string | number | JSX.Element;
}) {
  return (
    <div className='badge-container'>
      <div className='badge-icon' style={iconStyle}>
        {value}
      </div>
      <div className=''>{children}</div>
    </div>
  );
}
