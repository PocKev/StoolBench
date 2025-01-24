import { useState } from "react";
import { Panel, SelectPicker, Button, Message, useToaster } from "rsuite";

function BenchPanel() {
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  const toaster = useToaster();

  const options = [
    { label: "Opt 1", value: "Opt 1" },
    { label: "Opt 2", value: "Opt 2" },
  ];

  const onClick = async () => {
    if (!selectedOption) {
      toaster.push(
        <Message type="error" closable={true}>
          Please select an option!
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
      setSelectedOption(""); // Reset the dropdown
    }
  };

  return (
    <Panel bordered header="Stool Bench" style={{ width: 350, padding: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <SelectPicker
          data={options}
          value={selectedOption}
          onChange={(value) => setSelectedOption(value || "")}
          searchable={false}
          placeholder="Select an option"
          style={{ width: "100%" }}
        />
      </div>
      <Button appearance="primary" onClick={onClick} loading={loading}>
        Log a log session
      </Button>
    </Panel>
  );
}

export default BenchPanel;
