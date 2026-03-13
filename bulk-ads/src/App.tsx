import { useState } from "react";
import { Toolbar } from "./components/Toolbar";
import { AdGrid } from "./components/AdGrid";
import { EditorPanel } from "./components/EditorPanel";
import { GlobalSettingsPanel } from "./components/GlobalSettingsPanel";
import { useAdVariations } from "./hooks/useAdVariations";
import { useGlobalSettings } from "./hooks/useGlobalSettings";

function App() {
  const {
    variations,
    selected,
    selectedId,
    updateVariation,
    selectVariation,
  } = useAdVariations();

  const {
    settings: globalSettings,
    updateColor,
    updateWeight,
    updateFont,
  } = useGlobalSettings();

  const [globalSettingsOpen, setGlobalSettingsOpen] = useState(false);

  const handleSelectCard = (id: string) => {
    if (globalSettingsOpen) setGlobalSettingsOpen(false);
    selectVariation(selectedId === id ? null : id);
  };

  const handleToggleGlobalSettings = () => {
    if (!globalSettingsOpen) selectVariation(null);
    setGlobalSettingsOpen((prev) => !prev);
  };

  const showEditor = selected !== null && !globalSettingsOpen;
  const showGlobal = globalSettingsOpen;

  return (
    <div className="flex flex-col h-screen">
      <Toolbar
        onToggleGlobalSettings={handleToggleGlobalSettings}
        globalSettingsOpen={globalSettingsOpen}
        variationCount={variations.length}
      />
      <div className="flex flex-1 overflow-hidden">
        <AdGrid
          variations={variations}
          globalSettings={globalSettings}
          selectedId={selectedId}
          onSelect={handleSelectCard}
        />
        {showEditor && (
          <EditorPanel
            ad={selected}
            onUpdate={updateVariation}
            onClose={() => selectVariation(null)}
          />
        )}
        {showGlobal && (
          <GlobalSettingsPanel
            settings={globalSettings}
            onUpdateColor={updateColor}
            onUpdateWeight={updateWeight}
            onUpdateFont={updateFont}
            onClose={() => setGlobalSettingsOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
