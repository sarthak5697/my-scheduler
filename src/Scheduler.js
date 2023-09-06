import { createRoot } from "react-dom/client";
import "./index.css";
import Header from "./Header";
import * as React from "react";
import { useEffect, useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import {
  Day,
  Week,
  Month,
  Agenda,
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import { extend } from "@syncfusion/ej2-base";
import { updateSampleSection } from "./sample-base";
import dataSource from "./datasource.json";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { constData } from "./cellData";

const eventTemplate = (props) => {
  console.log(props);
  const {
    ID,
    Subject,
    StartTime,
    EndTime,
    Duration,
    Priority,
    OrderWorth,
    Started,
    Customer,
  } = props;

  let backgroundColor;

  switch (Subject) {
    case "Broken":
      backgroundColor = "#DC143C";
      break;
    case "Idle":
      backgroundColor = "#FFBF00	";
      break;
    case "In Progress":
      backgroundColor = "#50C878";
      break;
    default:
      backgroundColor = "#FFFFFF";
  }
  return (
    <Box className="template-wrap bg-cardColor">
      <Flex direction={"column"}>
        <Text
          color={"white"}
          fontWeight={"medium"}
          padding={"5px"}
          fontSize={"2xl"}
          marginX={"10px"}
        >
          ID : {ID}
        </Text>
        <Box
          backgroundColor={backgroundColor}
          marginX={"10px"}
          className="rounded-xl"
        >
          <Text
            color={"white"}
            fontWeight={"bold"}
            paddingX={"5px"}
            alignItems={"center"}
            fontSize={"xl"}
          >
            {Subject}
          </Text>
        </Box>
        <Box id="information " padding={"5px"} marginX={"10px"}>
          <Flex direction={"column"} justifyContent={"space-between"}>
            <Flex direction={"row"} justifyContent={"space-between"}>
              <Text color={"white"} fontWeight={"medium"} fontSize={"md"}>
                1:50:00
              </Text>
              <Text color={"white"} fontWeight={"medium"} fontSize={"md"}>
                {Duration}
              </Text>
            </Flex>
            <Text color={"white"} fontWeight={"medium"} fontSize={"md"}>
              Priority :<span> {Priority} </span>
            </Text>
            <Text color={"white"} fontWeight={"medium"} fontSize={"md"}>
              Order Worth :<span> {OrderWorth} </span>
            </Text>
            <Text color={"white"} fontWeight={"medium"} fontSize={"md"}>
              Started :<span>{Started}</span>
            </Text>
            <Text color={"white"} fontWeight={"medium"} fontSize={"md"}>
              Customer :<span> {Customer} </span>
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

const GroupByDate = () => {
  useEffect(() => {
    updateSampleSection();
  }, []);
  const data = extend([], constData, null, true);
  console.log("data :", data);

  const [group, setGroup] = useState({
    byDate: true,
    hideNonWorkingDays: false,
    resources: ["Owners"],
  });

  const resourceData2 = [
    {
      text: "Laser Cutting Machine",
      id: 1,
      color: "#E5C874",
    },
    {
      text: "Electric Furnace",
      id: 2,
      color: "#9CDA30",
    },
    {
      text: "Industrial Oven",
      id: 3,
      color: "#DA5430",
    },
    { text: "Conveyor Belt", id: 4, color: "#C530DA" },
    { text: "Industrial Belt", id: 5, color: "#DF941B" },
    { text: "CNC Plasma Cutter", id: 6, color: "#5BDD93" },
    { text: "Industrial Boiler", id: 7, color: "#464646" },
    { text: "Hydraulic Press", id: 8, color: "#C91B5B" },
  ];

  // const onChange = (args) => {
  //   setGroup({ ...group, hideNonWorkingDays: args.checked ? true : false });
  // };

  return (
    <Box py={"20px"} bg={"#fff9ed"}>
      <div className="schedule-control-section bg-skin">
        <div className="col-lg-12 control-section bg-skin">
          <div className="control-wrapper bg-skin">
            <br />
            <br />
            <ScheduleComponent
              backgroundColor="#fff9ed"
              //  cellTemplate={eventTemplate}

              width="100%"
              height="650px"
              selectedDate={new Date(2023, 0, 6)}
              eventSettings={{
                enableMaxHeight: true,
                template: eventTemplate,
                dataSource: data,
                fields: {
                  subject: { title: "Task", name: "Subject" },
                  location: { title: "Project Name", name: "Location" },
                  description: { title: "Comments", name: "Description" },
                  startTime: { title: "From :", name: "StartTime" },
                  endTime: { title: "To :", name: "EndTime" },
                },
              }}
              group={group}
            >
              <ResourcesDirective>
                <ResourceDirective
                  field="TaskId"
                  title="Assignee"
                  name="Owners"
                  allowMultiple={true}
                  dataSource={resourceData2}
                  textField="text"
                  idField="id"
                  colorField="color"
                  workDaysField="workDays"
                />
              </ResourcesDirective>
              <ViewsDirective>
                <ViewDirective option="Day" />
                {/* <ViewDirective option='Week'/>
              <ViewDirective option='Month'/>
              <ViewDirective option='Agenda'/> */}
              </ViewsDirective>
              <Inject services={[Day, Resize, DragAndDrop]} />
            </ScheduleComponent>
          </div>
        </div>
      </div>
    </Box>
  );
};
export default GroupByDate;

const root = createRoot(document.getElementById("sample"));
root.render(<GroupByDate />);
