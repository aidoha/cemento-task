import { useState } from 'react';
import Table from './components/table';
import tableDataJson from './table-data.json';

function App() {
	const [tableData, setTableData] = useState(tableDataJson);
	return (
		<div>
			<Table tableData={tableData} setTableData={setTableData} />
		</div>
	);
}

export default App;
