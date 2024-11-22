import ImageGallery from "../src/RenderImagine"
import UploadImage from "../src/UploadImagine"
function App() {
  return (
    <div style={{width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
        <UploadImage/>
        <ImageGallery/>
    </div>
  );
}

export default App;
