import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/button";

export default function LinkButton({
  url,
  label,
}: {
  url: string;
  label: string;
}): JSX.Element {
  return (
    <div className="flex flex-col items-center px-4 py-10">
      <Button
        size="lg"
        as="a"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full"
      >
        {label} <FontAwesomeIcon icon={faExternalLink} className="ml-2" />
      </Button>
    </div>
  );
}
