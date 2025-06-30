import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CategoriesCheckbox = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { register, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      technicalSelectAll: [],
      tacticalSelectAll: [],
      PhysicalSelectAll: [],
      GameplanSelectAll: [],
      withoutTopicSelectAll: [],
    },
  });

  const onSubmit = (data) => {
    console.log("Technical Data:", data.technicalSelectAll);
    console.log("Tactical Data:", data.tacticalSelectAll);
    console.log("Physical Data:", data.PhysicalSelectAll);
    console.log("Gameplan Data:", data.GameplanSelectAll);
    console.log("withoutTopic Data:", data.withoutTopicSelectAll);
  };

  //   Technical----------
  const technicalOptions = [
    "Passing & Receiving",
    "Passing Patterns",
    "Ball Control",
    "Dribbling",
    "Finishing",
    "Heading",
    "Crossing",
    "Ball Controls",
    "Technical Drill",
  ];
  const technicalSelectAll = watch("technicalSelectAll") || [];
  const isTechnicalSelectAll =
    technicalSelectAll.length === technicalOptions.length;

  const handleTechnicalSelectAll = (e) => {
    if (e.target.checked) {
      setValue("technicalSelectAll", technicalOptions);
    } else {
      setValue("technicalSelectAll", []);
    }
  };

  const handleTechnicalCheckBox = (e, item) => {
    const newCheckItem = e.target.checked
      ? [...technicalSelectAll, item]
      : technicalSelectAll.filter((i) => i !== item);
    setValue("technicalSelectAll", newCheckItem);
  };

  //   Tactical----------
  const tacticalOptions = [
    "Rondos",
    "Possession",
    "Possession & Transition",
    "Defending Form",
    "Finishing Patterns",
    "Finishing the attack",
    "Transition DEF / OFF",
    "Transition OFF /DEF ",
    "Transition Drills",
    "Pressing",
    "Gegenpressing",
    "Counterattack",
    "Switching Play",
    "Play through the middle",
    "Outnumber Games",
    "Combination Play",
    "Build Up Play",
    "Wide Play",
    "Positional Play",
    "Playing through thirds",
    "Movements",
    "High - Block",
    "Mid - Block",
    "Low - Block",
  ];
  const tacticalSelectAll = watch("tacticalSelectAll") || [];
  const isTacticalSelectAll =
    tacticalSelectAll.length === tacticalOptions.length;

  const handleTacticalSelectAll = (e) => {
    if (e.target.checked) {
      setValue("tacticalSelectAll", tacticalOptions);
    } else {
      setValue("tacticalSelectAll", []);
    }
  };

  const handleTacticalCheckBox = (e, item) => {
    const newCheckItem = e.target.checked
      ? [...tacticalSelectAll, item]
      : tacticalSelectAll.filter((i) => i !== item);
    setValue("tacticalSelectAll", newCheckItem);
  };

  //   Physical--------

  const PhysicalOptions = [
    "Strength",
    "Speed",
    "Mobility",
    "Coordination",
    "Power",
    "Endurance",
    "Agility",
  ];
  const PhysicalSelectAll = watch("PhysicalSelectAll") || [];
  const isPhysicalSelectAll =
    PhysicalSelectAll.length === PhysicalOptions.length;

  const handlePhysicalSelectAll = (e) => {
    if (e.target.checked) {
      setValue("PhysicalSelectAll", PhysicalOptions);
    } else {
      setValue("PhysicalSelectAll", []);
    }
  };

  const handlePhysicalCheckBox = (e, item) => {
    const newCheckItem = e.target.checked
      ? [...PhysicalSelectAll, item]
      : PhysicalSelectAll.filter((i) => i !== item);
    setValue("PhysicalSelectAll", newCheckItem);
  };

  // Gameplan

  const GameplanOptions = [
    "Formation",
    "Corner DEF",
    "Corner OFF",
    "Throw",
    "Ins -Free Kicks OFF",
    "Free Kicks DEF",
    "Organization DEF",
    "Organization OFF",
    "Game Ideas",
    "Transitions",
  ];
  const GameplanSelectAll = watch("GameplanSelectAll") || [];
  const isGameplanSelectAll =
    GameplanSelectAll.length === GameplanOptions.length;

  const handleGameplanSelectAll = (e) => {
    if (e.target.checked) {
      setValue("GameplanSelectAll", GameplanOptions);
    } else {
      setValue("GameplanSelectAll", []);
    }
  };

  const handleGameplanCheckBox = (e, item) => {
    const newCheckItem = e.target.checked
      ? [...GameplanSelectAll, item]
      : GameplanSelectAll.filter((i) => i !== item);
    setValue("GameplanSelectAll", newCheckItem);
  };

  // withoutTopic

  const withoutTopicOptions = [
    "Full Game Form",
    "SSG",
    "DEF Training",
    "Mid Training",
    "OFF Training",
    "BOX Traning",
    "3vs3 4v4 5vs5",
    "7vs7 9vs9 11vs11",
  ];
  const withoutTopicSelectAll = watch("withoutTopicSelectAll") || [];
  const iswithoutTopicSelectAll =
    withoutTopicSelectAll.length === withoutTopicOptions.length;

  const handlewithoutTopicSelectAll = (e) => {
    if (e.target.checked) {
      setValue("withoutTopicSelectAll", withoutTopicOptions);
    } else {
      setValue("withoutTopicSelectAll", []);
    }
  };

  const handlewithoutTopicCheckBox = (e, item) => {
    const newCheckItem = e.target.checked
      ? [...withoutTopicSelectAll, item]
      : withoutTopicSelectAll.filter((i) => i !== item);
    setValue("withoutTopicSelectAll", newCheckItem);
  };

  const handlereset = () => {
    reset({
      technicalSelectAll: [],
      tacticalSelectAll: [],
      PhysicalSelectAll: [],
      GameplanSelectAll: [],
      withoutTopicSelectAll: [],
    });
  };

  return (
    <div>
      <button
        className="hover:text-[#010792] flex items-center justify-center text-lg font-medium border hover:border-[#010792] hover:bg-transparent py-[8px] px-[35px] rounded-full bg-[#010792] w-[300px] text-white duration-300"
        variant="outline"
        onClick={() => setIsDialogOpen(true)}
      >
        Categories
      </button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[1180px]" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="text-[32px] text-[#000342]">
              Add Categories
            </DialogTitle>
            <hr className="text-gray-200" />
          </DialogHeader>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Accordion className="space-y-2" type="single" collapsible>
                  {/* Technical Item */}
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="flex gap-2 items-center text-[#010792]">
                        <input
                          type="checkbox"
                          value="all"
                          className="h-5 w-5"
                          checked={isTechnicalSelectAll}
                          onChange={handleTechnicalSelectAll}
                        />
                        <label>Technical</label>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-4">
                        {technicalOptions.map((item) => (
                          <label
                            key={item}
                            className="flex items-center gap-3 border border-[#E6E6F4] bg-[#E6E6F4] p-2 rounded-[8px]"
                          >
                            <input
                              type="checkbox"
                              {...register("technicalSelectAll")}
                              checked={technicalSelectAll.includes(item)}
                              value={item}
                              onChange={(e) => handleTechnicalCheckBox(e, item)}
                              className="h-4 w-4"
                            />
                            {item}
                          </label>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Tactical Item */}
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      <div className="flex gap-2 items-center text-[#010792]">
                        <input
                          type="checkbox"
                          value="all"
                          className="h-5 w-5"
                          checked={isTacticalSelectAll}
                          onChange={handleTacticalSelectAll}
                        />
                        <label>Tactical</label>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-4">
                        {tacticalOptions.map((item) => (
                          <label
                            key={item}
                            className="flex items-center gap-3 border border-[#E6E6F4] bg-[#E6E6F4] p-2 rounded-[8px]"
                          >
                            <input
                              type="checkbox"
                              {...register("tacticalSelectAll")}
                              checked={tacticalSelectAll.includes(item)}
                              value={item}
                              onChange={(e) => handleTacticalCheckBox(e, item)}
                              className="h-4 w-4"
                            />
                            {item}
                          </label>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Physical Item */}
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      <div className="flex gap-2 items-center text-[#010792]">
                        <input
                          type="checkbox"
                          value="all"
                          className="h-5 w-5"
                          checked={isPhysicalSelectAll}
                          onChange={handlePhysicalSelectAll}
                        />
                        <label>Physical</label>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-4">
                        {PhysicalOptions.map((item) => (
                          <label
                            key={item}
                            className="flex items-center gap-3 border border-[#E6E6F4] bg-[#E6E6F4] p-2 rounded-[8px]"
                          >
                            <input
                              type="checkbox"
                              {...register("PhysicalSelectAll")}
                              checked={PhysicalSelectAll.includes(item)}
                              value={item}
                              onChange={(e) => handlePhysicalCheckBox(e, item)}
                              className="h-4 w-4"
                            />
                            {item}
                          </label>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Gameplan Item */}
                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      <div className="flex gap-2 items-center text-[#010792]">
                        <input
                          type="checkbox"
                          value="all"
                          className="h-5 w-5"
                          checked={isGameplanSelectAll}
                          onChange={handleGameplanSelectAll}
                        />
                        <label>Gameplan</label>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-4">
                        {GameplanOptions.map((item) => (
                          <label
                            key={item}
                            className="flex items-center gap-3 border border-[#E6E6F4] bg-[#E6E6F4] p-2 rounded-[8px]"
                          >
                            <input
                              type="checkbox"
                              {...register("GameplanSelectAll")}
                              checked={GameplanSelectAll.includes(item)}
                              value={item}
                              onChange={(e) => handleGameplanCheckBox(e, item)}
                              className="h-4 w-4"
                            />
                            {item}
                          </label>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* withoutTopic Item */}
                  <AccordionItem value="item-5">
                    <AccordionTrigger>
                      <div className="flex gap-2 items-center text-[#010792]">
                        <input
                          type="checkbox"
                          value="all"
                          className="h-5 w-5"
                          checked={iswithoutTopicSelectAll}
                          onChange={handlewithoutTopicSelectAll}
                        />
                        <label>Without Topic</label>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-4">
                        {withoutTopicOptions.map((item) => (
                          <label
                            key={item}
                            className="flex items-center gap-3 border border-[#E6E6F4] bg-[#E6E6F4] p-2 rounded-[8px]"
                          >
                            <input
                              type="checkbox"
                              {...register("withoutTopicSelectAll")}
                              checked={withoutTopicSelectAll.includes(item)}
                              value={item}
                              onChange={(e) =>
                                handlewithoutTopicCheckBox(e, item)
                              }
                              className="h-4 w-4"
                            />
                            {item}
                          </label>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={handlereset}
                  className="bg-[#010792] w-[150px] py-[10px] px-[35px] text-white rounded-full mt-4 hover:text-[#010792] hover:bg-white duration-200 border border-[#010792]"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="bg-[#010792] w-[150px] py-[10px] px-[35px] text-white rounded-full mt-4 hover:text-[#010792] hover:bg-white duration-200 border border-[#010792]"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoriesCheckbox;
