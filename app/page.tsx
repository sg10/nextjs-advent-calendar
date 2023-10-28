import { faCandyCane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

export default function Page() {
  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-4 items-center justify-center">
      <div>
        <FontAwesomeIcon
          icon={faCandyCane}
          className="h-20 w-20 text-primary"
        />
      </div>
      <p>Please enter the code to open your advent calendar.</p>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          size="lg"
          type="code"
          placeholder="Code"
          className="w-200 mx-auto"
        />
      </div>
      <Button size="lg">Enter</Button>
    </div>
  );
}
