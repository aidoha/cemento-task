import Table from './components/table';
import tableData from './table-data.json';

function App() {
	return (
		<div>
			<Table tableData={tableData} />
		</div>
	);
}

export default App;
