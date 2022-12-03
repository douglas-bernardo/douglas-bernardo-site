type Props = {
  lang: string;
};

export function FlagIcon({ lang }: Props) {
  const code = lang.substring(3).toLowerCase();

  return <span className={`fi fi-${code}`} />;
}
