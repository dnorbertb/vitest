import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect } from 'vitest';
import { useToDoStore } from '../itemsStore';

// Testing data store
describe('Data store tests', () => {
    // Pinia store can't work without an instance
    // So we need to create pinia instance
    setActivePinia(createPinia());
    const toDoStore = useToDoStore();
    const testItemData = { value: 'Test item', isDone: false };
    let testItemId: number;

    it('Checks addItem method', () => {
        testItemId = toDoStore.addItem(testItemData);
        expect(toDoStore.toDoItems.length).toBe(1);
    });

    it('Checks if store contains test item', () => {
        expect(toDoStore.toDoItems).toContainEqual({ id: testItemId, ...testItemData });
    });

    it('Checks setIsDone method', () => {
        toDoStore.setIsDone(testItemId, true);
        const item = toDoStore.toDoItems.find(i => i.id === testItemId);
        expect(item?.isDone).toBe(true);
    });

    it('Checks removeItem method', () => {
        toDoStore.removeItem(testItemId);
        expect(toDoStore.toDoItems.length).toBe(0);
    });
})
