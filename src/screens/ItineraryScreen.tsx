import React, {useMemo, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {AppHeader} from '../components/AppHeader';
import {CompactTextKeyboard} from '../components/CompactTextKeyboard';
import {ScreenFrame} from '../components/ScreenFrame';
import {getGuidePlace} from '../data/guide';
import {colors, layout} from '../theme/theme';
import type {GuidePlace, ItineraryState} from '../types/app';

type Props = {
  itinerary: ItineraryState;
  setItinerary: React.Dispatch<React.SetStateAction<ItineraryState>>;
  onOpenPlace: (placeId: string) => void;
  onViewOnMap: (placeId: string) => void;
};

const checklistItems = [
  {id: 'id', label: 'Valid photo ID for 19+ areas'},
  {id: 'parking', label: 'Check parking and route'},
  {id: 'dining', label: 'Confirm dining hours'},
  {id: 'showtime', label: 'Confirm show time and entry rules'},
];

const suggestedPlaceIds = [
  'visitor-essentials',
  'hotel-spa',
  'entertainment-centre',
  'lake-couchiching-waterfront',
];

export function ItineraryScreen({
  itinerary,
  setItinerary,
  onOpenPlace,
  onViewOnMap,
}: Props): React.JSX.Element {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const savedPlaces = useMemo(
    () =>
      itinerary.savedPlaceIds
        .map(placeId => getGuidePlace(placeId))
        .filter((place): place is GuidePlace => Boolean(place)),
    [itinerary.savedPlaceIds],
  );
  const suggestions = suggestedPlaceIds
    .filter(placeId => !itinerary.savedPlaceIds.includes(placeId))
    .map(placeId => getGuidePlace(placeId))
    .filter((place): place is GuidePlace => Boolean(place));

  const toggleChecklist = (itemId: string) => {
    setItinerary(current => ({
      ...current,
      checklist: {
        ...current.checklist,
        [itemId]: !current.checklist[itemId],
      },
    }));
  };

  const updateNotes = (nextNotes: string) => {
    setItinerary(current => ({...current, notes: nextNotes}));
  };

  const addKey = (key: string) => updateNotes(`${itinerary.notes}${key}`);
  const backspace = () => updateNotes(itinerary.notes.slice(0, -1));
  const clearNotes = () => updateNotes('');

  const removeSavedPlace = (placeId: string) => {
    setItinerary(current => ({
      ...current,
      savedPlaceIds: current.savedPlaceIds.filter(id => id !== placeId),
    }));
  };

  const savePlace = (placeId: string) => {
    setItinerary(current => ({
      ...current,
      savedPlaceIds: current.savedPlaceIds.includes(placeId)
        ? current.savedPlaceIds
        : [placeId, ...current.savedPlaceIds],
    }));
  };

  const completedCount = checklistItems.filter(
    item => itinerary.checklist[item.id],
  ).length;

  return (
    <View style={styles.root}>
      <AppHeader title="Itinerary" />
      <ScreenFrame>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Trip Plan</Text>
          <Text style={styles.summaryBody}>
            {savedPlaces.length} saved place
            {savedPlaces.length === 1 ? '' : 's'} · {completedCount}/
            {checklistItems.length} reminders checked
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Saved Places</Text>
        {savedPlaces.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No saved places yet</Text>
            <Text style={styles.emptyBody}>
              Save dining, resort, show, and nearby places to build a practical
              visit plan.
            </Text>
            <View style={styles.suggestionGrid}>
              {suggestions.map(place => (
                <Pressable
                  key={place.id}
                  onPress={() => savePlace(place.id)}
                  style={styles.suggestionChip}>
                  <Text style={styles.suggestionText}>{place.name}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.list}>
            {savedPlaces.map(place => (
              <SavedPlaceCard
                key={place.id}
                place={place}
                onOpen={() => onOpenPlace(place.id)}
                onRemove={() => removeSavedPlace(place.id)}
                onViewOnMap={() => onViewOnMap(place.id)}
              />
            ))}
          </View>
        )}

        <Text style={styles.sectionTitle}>Visit Checklist</Text>
        <View style={styles.checklist}>
          {checklistItems.map(item => {
            const checked = itinerary.checklist[item.id];
            return (
              <Pressable
                key={item.id}
                onPress={() => toggleChecklist(item.id)}
                style={[styles.checkRow, checked && styles.checkRowActive]}>
                <View
                  style={[styles.checkBox, checked && styles.checkBoxActive]}>
                  <Text
                    style={[
                      styles.checkMark,
                      checked && styles.checkMarkActive,
                    ]}>
                    ✓
                  </Text>
                </View>
                <Text
                  style={[styles.checkText, checked && styles.checkTextActive]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Trip Notes</Text>
        <Pressable
          onPress={() => setKeyboardOpen(true)}
          style={[styles.notesBox, keyboardOpen && styles.notesBoxActive]}>
          <Text
            style={
              itinerary.notes ? styles.notesText : styles.notesPlaceholder
            }>
            {itinerary.notes || 'Tap to add local notes'}
          </Text>
        </Pressable>
        {keyboardOpen ? (
          <View style={styles.keyboardWrap}>
            <CompactTextKeyboard
              onPressKey={addKey}
              onBackspace={backspace}
              onClear={clearNotes}
              onDone={() => setKeyboardOpen(false)}
            />
          </View>
        ) : null}

        <View style={styles.footerCard}>
          <Text style={styles.footerTitle}>Stored on this device</Text>
          <Text style={styles.footerBody}>
            Saved places, checklist status, and notes stay local. The guide does
            not contact staff, process purchases, or control hotel systems.
          </Text>
        </View>
      </ScreenFrame>
    </View>
  );
}

function SavedPlaceCard({
  place,
  onOpen,
  onRemove,
  onViewOnMap,
}: {
  place: GuidePlace;
  onOpen: () => void;
  onRemove: () => void;
  onViewOnMap: () => void;
}): React.JSX.Element {
  return (
    <View style={styles.savedCard}>
      <Pressable onPress={onOpen} style={styles.savedMain}>
        <Image source={place.image} style={styles.savedImage} />
        <View style={styles.savedCopy}>
          <Text style={styles.savedCategory}>
            {place.category.toUpperCase()}
          </Text>
          <Text style={styles.savedTitle} numberOfLines={1}>
            {place.name}
          </Text>
          <Text style={styles.savedBody} numberOfLines={2}>
            {place.shortDescription}
          </Text>
        </View>
      </Pressable>
      <View style={styles.savedActions}>
        <Pressable onPress={onOpen} style={styles.actionButton}>
          <Text style={styles.actionText}>Details</Text>
        </Pressable>
        {place.coordinates ? (
          <Pressable onPress={onViewOnMap} style={styles.actionButton}>
            <Text style={styles.actionText}>Map</Text>
          </Pressable>
        ) : null}
        <Pressable onPress={onRemove} style={styles.removeButton}>
          <Text style={styles.removeText}>Remove</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.black,
  },
  summaryCard: {
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: 'rgba(21, 185, 120, 0.4)',
    backgroundColor: 'rgba(21, 185, 120, 0.1)',
    padding: 18,
    gap: 8,
  },
  summaryTitle: {
    color: colors.green,
    fontSize: 22,
    fontWeight: '900',
  },
  summaryBody: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '800',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '900',
    marginTop: 24,
    marginBottom: 12,
  },
  emptyCard: {
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 16,
    gap: 12,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  emptyBody: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  suggestionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  suggestionChip: {
    minHeight: 38,
    borderRadius: 8,
    backgroundColor: colors.surfaceSoft,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  suggestionText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  list: {
    gap: 12,
  },
  savedCard: {
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 12,
    gap: 12,
  },
  savedMain: {
    flexDirection: 'row',
    gap: 12,
  },
  savedImage: {
    width: 82,
    height: 82,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  savedCopy: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  savedCategory: {
    color: colors.green,
    fontSize: 11,
    fontWeight: '900',
  },
  savedTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  savedBody: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  savedActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    minHeight: 40,
    borderRadius: 8,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  removeButton: {
    flex: 1,
    minHeight: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(239, 48, 40, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(239, 48, 40, 0.34)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    color: colors.red,
    fontSize: 12,
    fontWeight: '900',
  },
  checklist: {
    gap: 10,
  },
  checkRow: {
    minHeight: 52,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkRowActive: {
    borderColor: 'rgba(21, 185, 120, 0.5)',
    backgroundColor: 'rgba(21, 185, 120, 0.1)',
  },
  checkBox: {
    width: 28,
    height: 28,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxActive: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  checkMark: {
    color: colors.dim,
    fontSize: 15,
    fontWeight: '900',
  },
  checkMarkActive: {
    color: colors.white,
  },
  checkText: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '800',
  },
  checkTextActive: {
    color: colors.white,
  },
  notesBox: {
    minHeight: 118,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 16,
  },
  notesBoxActive: {
    borderColor: colors.gold,
  },
  notesText: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
  },
  notesPlaceholder: {
    color: colors.dim,
    fontSize: 15,
    fontWeight: '800',
  },
  keyboardWrap: {
    marginTop: 10,
  },
  footerCard: {
    marginTop: 18,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 16,
    gap: 8,
  },
  footerTitle: {
    color: colors.gold,
    fontSize: 15,
    fontWeight: '900',
  },
  footerBody: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
  },
});
