"use client";

import { faCandyCane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    router.push(`/c/${data.code}`); // TODO some mapping...

  return (
    <Card>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full max-w-sm mx-auto flex flex-col gap-4 items-center justify-center">
            <div className="p-8">
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
                {...register("code", { required: true })}
              />
            </div>
            <Button size="lg" type="submit">
              Enter
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
