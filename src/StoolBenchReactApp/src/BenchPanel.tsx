import { useState } from "react";
import {
  Panel,
  SelectPicker,
  Button,
  Message,
  useToaster,
  Stack,
  Slider,
} from "rsuite";
import "rsuite/dist/rsuite.min.css";

function BenchPanel() {
  const [selectedOptionWetness, setSelectedOptionWetness] = useState("");
  const [selectedOptionExperience, setSelectedOptionExperience] = useState(0)
  const [loading, setLoading] = useState(false);
  const toaster = useToaster();

  const optionsWetness = [
    { label: "Cardboard", value: "wet0" },
    { label: "Playdough", value: "wet1" },
    { label: "Sopping Sponge", value: "wet2" },
    { label: "Coffee on Tap", value: "wet3" },
  ];

  const optionsExperience = [
    { label: "Unsatisfying", value: "exp0" },
    { label: "Obligatory", value: "exp1" },
    { label: "Alleviating", value: "exp2" },
    { label: "Rejuvenating", value: "exp3" },
  ]

  const onClick = async () => {
    if (!selectedOptionWetness) {
      toaster.push(
        <Message type="error" closable={true}>
          Please describe the moisture!
        </Message>,
        {
          placement: "topStart",
        }
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://p5lu4j23td.execute-api.us-east-1.amazonaws.com/prod/health`
      );
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      toaster.push(<Message type="success">API call successful!</Message>, {
        placement: "topStart",
      });
      console.log("API Response:", data);
    } catch (error) {
      toaster.push(<Message type="error">API call failed!</Message>, {
        placement: "topStart",
      });
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setSelectedOptionWetness(""); // Reset the dropdown
    }
  };

  return (
    <Panel bordered header="Welcome to Stool Bench" style={{ width: 350, padding: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <Panel bordered header={<Stack justifyContent="flex-start">Moisture</Stack>}>
          <SelectPicker
            data={optionsWetness}
            value={selectedOptionWetness}
            onChange={(value) => setSelectedOptionWetness(value || "")}
            searchable={false}
            placeholder="Select an option"
            style={{ width: "100%" }}
          />
        </Panel>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Panel bordered header={<Stack justifyContent="flex-start">Experience</Stack>}>
          <Slider
            min={0}
            max={optionsExperience.length - 1}
            value={selectedOptionExperience}
            className="custom-slider"
            graduated
            tooltip={false}
            onChange={setSelectedOptionExperience}
          />
          <div style={{ marginTop: 10, fontSize: 12 }}>
            {optionsExperience[selectedOptionExperience].label}
          </div>
        </Panel>
      </div>
      <Button appearance="primary" onClick={onClick} loading={loading}>
        Log a log session
      </Button>
    </Panel>
  );
}

export default BenchPanel;
