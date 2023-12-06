import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridValidRowModel,
  useGridApiRef,
  GridToolbarQuickFilter,
  GridToolbar,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import { Order, MenuItem } from '../store';
import axios, {handleErrors} from '../config/axiosConfig';
import { useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const initialRows: GridRowsProp = [];

async function saveOrder (order: Order) {
  return axios.post('/orders', order).then((res) => res.data, handleErrors);
}

async function deleteOrder (id: string | number) {
  return axios.delete('/orders', {params: id}).then((res) => res.data, handleErrors);
}

function mapGridRowToOrder(gridRow: GridValidRowModel): Order {
  if (gridRow.id === Infinity) {
    return {
      userId: gridRow.userId,
      time: gridRow.time,
      price: gridRow.price,
      status: gridRow.status,
      items: gridRow.items,
    };
  }
  return {
    id: gridRow.id,
    userId: gridRow.userId,
    time: gridRow.time,
    price: gridRow.price,
    status: gridRow.status,
    items: gridRow.items,
  };
}

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = Infinity;
    setRows((oldRows) => 
      [...oldRows, { id: id, userId: 1, status: 'pending', time: new Date(), price: 0, items: [], isNew: true }]
      );

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'userId' },
    }));
  };

  return (
    <GridToolbarContainer style={{display: 'flex', justifyContent: 'space-between'}}>
      <GridToolbar />
      <Button color="primary" style={{display: 'flex', justifyContent: 'right'}} startIcon={<AddIcon />} onClick={handleClick}>
        Add order
      </Button>
    </GridToolbarContainer>
  );
}

const ItemTable: React.FC<{items: MenuItem[], handleClose: any}> = ({items, handleClose}) => {  
  if (items.length === 0) {
    return (
      <React.Fragment>
        <DialogTitle>{"Items"}</DialogTitle>
        <DialogContent>
          No items in this order.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose}>Close</Button>
        </DialogActions>
      </React.Fragment>
    );
  }
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Item ID',
      type: 'number',
      flex: 0.1,
      minWidth: 50,
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Item Name',
      type: 'string',
      flex: 0.2,
      minWidth: 100,
    },
    {
      field: 'glutenFree',
      headerName: 'Gluten Free',
      type: 'boolean',
      flex: 0.1,
      minWidth: 50,
    },
    {
      field: 'vegan',
      headerName: 'Vegan',
      type: 'boolean',
      flex: 0.1,
      minWidth: 50,
    },
    {
      field: 'extraSauce',
      headerName: 'Extra Sauce',
      type: 'boolean',
      flex: 0.1,
      minWidth: 50,
    },
    {
      field: 'size',
      headerName: 'Size',
      type: 'string',
      flex: 0.1,
      minWidth: 50,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      flex: 0.2,
      minWidth: 50,
      editable: true,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      flex: 0.2,
      minWidth: 50,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return '';
        }
        return `$${params.value.toLocaleString()}`;
      }
    },
  ];

  return (
    <React.Fragment>
      <DialogTitle>{"Items"}</DialogTitle>
      <DialogContent>
        <DataGrid
          rows={items}
          columns={columns}
          sx={{ height: '100%' }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </React.Fragment>
  );
}

export default function FullFeaturedCrudGrid() {
  
  const [rows, setRows] = React.useState(initialRows);

  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const [open, setOpen] = React.useState(false);

  const [items, setItems] = React.useState([]);

  useEffect(() => {
    axios.get("/orders").then((res) => res.data)
    .then((data) => {
      setRows(data.map((order: Order) => ({...order, isNew: false})));
    }, handleErrors);
  }, []);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => async () => {
    let rowValue: GridValidRowModel = rows.find((row) => row.id === id)!;
    const newOrder: Order = await saveOrder(mapGridRowToOrder(rowValue));
    setRows((oldRows) => 
      oldRows.map((row) => (row.id === id ? { ...newOrder } : row))
    );
    setRowModesModel({ ...rowModesModel, [newOrder.id!]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    deleteOrder(id.valueOf());
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Order ID',
      type: 'number',
      flex: 0.1,
      minWidth: 50,
      editable: false,
    },
    {
      field: 'userId',
      headerName: 'User ID',
      type: 'number',
      flex: 0.2,
      minWidth: 100,
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Order Status',
      flex: 0.1,
      minWidth: 150,
      editable: true,
    },
    {
      field: 'time',
      headerName: 'Order Time',
      valueGetter: ({ value }) => value && new Date(value),
      type: 'dateTime',
      flex: 0.2,
      minWidth: 150,
      editable: true,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      flex: 0.1,
      minWidth: 100,
      align: 'left',
      editable: true,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return '';
        }
        return `$${params.value.toLocaleString()}`;
      }
    },
    {
      field: 'isNew',
      type: 'boolean',
      headerName: 'New',
      flex: 0.1,
      minWidth: 50,
      editable: false,
    },
    {
      field: 'items',
      type: 'actions',
      headerName: 'Items',
      flex: 0.1,
      minWidth: 50,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<InfoIcon />}
            label="View Items"
            sx={{
              color: 'primary.main',
            }}
            onClick={() => {
              axios.get("/itemToOrder", {params: {orderId: id}})
                .then((res) => res.data)
                .then((data) => {
                  
                  setItems(data);
                  setOpen(true);
                }, handleErrors)
            }}
            
          />
        ];
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 0.1,
      minWidth: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid 
        autoHeight
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        initialState={{
          sorting: {
            sortModel: [{ field: 'isNew', sort: 'desc' }],
          },
          columns: {
            columnVisibilityModel: {
              isNew: false,
            }
          }
        }}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
      
      <Dialog title='Items' open={open} onClose={handleClose} fullWidth={true} maxWidth='lg'>
        <ItemTable items={items} handleClose={handleClose} />
      </Dialog>
    );
    </Box>
  );
}
