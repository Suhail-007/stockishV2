// ProductTable.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Product } from '../../features/types/product.type';

type ProductTableProps = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
};

export const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => toggleExpand(item.id)}>
      <View style={styles.row}>
        <Text style={styles.icon}>{item.name[0].toUpperCase()}</Text>
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>₹{item.sellPrice}</Text>
        </View>
      </View>
      {expandedId === item.id && (
        <View style={styles.expandedContent}>
          <Text>Quantity: {item.quantity}</Text>
          <Text>Buy Price: ₹{item.buyPrice}</Text>
          <Text>Status: {item.status}</Text>
          <Text>Created: {new Date(item.createdAt).toLocaleString()}</Text>
          <Text>Updated: {new Date(item.updatedAt).toLocaleString()}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              onPress={() => onEdit(item)}
              style={styles.editButton}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onDelete(item.id)}
              style={styles.deleteButton}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    backgroundColor: '#E6EDFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#3A4CFF'
  },
  details: {
    marginLeft: 10
  },
  name: {
    fontSize: 16,
    fontWeight: '600'
  },
  price: {
    color: 'green',
    marginTop: 4
  },
  expandedContent: {
    marginTop: 10
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between'
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 5
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 8,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default ProductTable;
