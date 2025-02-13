// styles/index.ts
import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  // Estilos Generales
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },

  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  scrollView: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
  },

  scrollContent: {
    padding: 16,
  },

  // Pantalla Principal (Dashboard)
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 4,
    backgroundColor: "#4CAF50",
  },

  actionButtonText: {
    color: "white",
    marginTop: 8,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    textAlign: "center",
  },

  section: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#1a1a1a",
  },

  sectionLink: {
    color: "#4CAF50",
    fontFamily: "Poppins_400Regular",
  },

  progressSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  retryButton: {
    padding: 8,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    marginTop: 16,
  },

  retryButtonText: {
    color: "white",
    fontFamily: "Poppins_600SemiBold",
  },

  aiChatButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },

  aiChatButtonText: {
    color: "white",
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    marginBottom: 4,
  },

  aiChatSubtext: {
    color: "white",
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
  },

  workoutCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },

  workoutName: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#1a1a1a",
    marginBottom: 8,
  },

  upcomingWorkouts: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16, // Espacio entre tarjetas
  },

  upcomingWorkoutCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    flex: 1,
  },

  upcomingWorkoutDay: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#4CAF50",
    marginBottom: 4,
  },

  upcomingWorkoutName: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#1a1a1a",
    marginBottom: 4,
  },

  upcomingWorkoutTime: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
  },

  // Estilos de Rutinas
  workoutTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#1a1a1a",
    marginBottom: 4,
  },

  bentoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  bentoCard: {
    width: "48%", // Adapta automáticamente a dos columnas
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 16,
    alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 4,
  },

  bentoCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  bentoCardTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#1a1a1a",
    marginBottom: 4,
    textAlign: "center",
  },

  bentoCardText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    textAlign: "center",
  },

  bentoCardSubtext: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#999",
    textAlign: "center",
  },

  exerciseList: {
    marginBottom: 16,
  },

  exerciseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },

  exerciseCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },

  exerciseName: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    color: "#1a1a1a",
    marginBottom: 4,
    textAlign: "center",
  },

  completeSetButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#4CAF50",
  },

  setsSummary: {
    marginTop: 8,
  },

  setsText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
  },

  exerciseDetails: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    marginTop: 4,
  },

  workoutFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 12,
  },

  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
  },

  addButtonText: {
    color: "white",
    marginLeft: 8,
    fontFamily: "Poppins_600SemiBold",
  },

  workoutsList: {
    paddingVertical: 16,
  },

  // Selector de Ejercicios
  selectorButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },

  selectorButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#4CAF50",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: "80%",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  modalTitle: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
  },

  searchInput: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontFamily: "Poppins_400Regular",
  },

  closeButton: {
    padding: 8,
  },

  // Ejercicio en Progreso
  exerciseProgress: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },

  setsContainer: {
    marginTop: 16,
  },

  setRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },

  setNumber: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#1a1a1a",
  },

  setInput: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 8,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#333",
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  // Timer
  timerModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  timerModal: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    minWidth: 200,
  },

  timerTitle: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 16,
  },

  timerCount: {
    fontSize: 48,
    fontFamily: "Poppins_700Bold",
    color: "#4CAF50",
    marginBottom: 16,
  },

  timerCancelButton: {
    padding: 8,
  },

  timerCancelText: {
    color: "#666",
    fontFamily: "Poppins_400Regular",
  },

  // Progreso y Fotos
  photoGrid: {
    marginTop: 16,
  },

  photoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    marginHorizontal: 8, // Espaciado horizontal entre fotos
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },

  photo: {
    width: "100%",
    height: 200, // Tamaño estándar para las fotos
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  // Estadísticas y Gráficos
  statsCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    margin: 8,
  },

  chartWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  chartContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    width: "100%", // Hace que el contenedor ocupe todo el ancho disponible
    maxWidth: 400, // Ancho máximo para evitar gráficos demasiado grandes
    alignItems: "center", // Centra el gráfico dentro del contenedor
    marginVertical: 8,
  },

  chartTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#1a1a1a",
    marginBottom: 8,
    textAlign: "center",
  },

  chart: {
    borderRadius: 16,
  },

  statCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },

  statTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#1a1a1a",
  },

  statSubtext: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    marginTop: 4,
  },

  // Chat
  chatContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  messageList: {
    flex: 1,
    padding: 16,
  },

  message: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },

  userMessage: {
    backgroundColor: "#4CAF50",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },

  userMessageText: {
    color: "#fff",
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
  },

  aiMessage: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  aiMessageText: {
    color: "#1a1a1a",
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
  },

  messageText: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },

  chatInputContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    padding: 8,
  },

  chatInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f9f9f9",
  },

  sendButton: {
    marginLeft: 8,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  // Navegación
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  navButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 120,
    justifyContent: "center",
  },

  navButtonText: {
    color: "white",
    marginHorizontal: 8,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
  },

  disabledButton: {
    opacity: 0.5,
  },

  // Formularios y Medidas
  formSection: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
  },

  input: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#333",
    paddingVertical: 8,
  },

  measurementField: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 1,
  },

  measurementLabel: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },

  measurementInput: {
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderRadius: 8,
    width: 100,
    textAlign: "center",
    marginHorizontal: 8,
  },

  measurementUnit: {
    width: 40,
    fontSize: 14,
    color: "#666",
  },

  // Botones y Acciones
  button: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },

  iconButton: {
    padding: 8,
  },

  summaryButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
  },

  finishButton: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "#ff4444",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    elevation: 5,
  },

  finishButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },

  // Estados
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  emptyStateText: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    textAlign: "center",
  },

  errorState: {
    backgroundColor: "#ffebee",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },

  errorText: {
    color: "#c62828",
    fontFamily: "Poppins_400Regular",
  },

  // Resumen de Entrenamiento
  summaryContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },

  summaryTitle: {
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 20,
  },

  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  statBox: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 4,
  },

  statValue: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    color: "#4CAF50",
  },

  statLabel: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    marginTop: 4,
  },

  summaryActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  // Ejecución de Ejercicios
  exerciseContainer: {
    flex: 1,
    padding: 16,
  },

  exerciseSummary: {
    marginBottom: 16,
  },

  completeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },

  completedButton: {
    opacity: 0.5,
  },

  // Sets y Repeticiones
  setsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },

  setBox: {
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderRadius: 6,
    margin: 4,
  },

  completedSetBox: {
    backgroundColor: "#4CAF50",
    borderColor: "#43A047",
  },

  setText: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#666",
  },

  setTextCompleted: {
    color: "#fff",
  },

  // Selección de Ejercicios
  selectedExercise: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },

  removeButton: {
    padding: 4,
  },

  // Métricas de Progreso
  progressMetrics: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },

  metricTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 16,
    color: "#1a1a1a",
  },

  // Elementos de Lista
  listItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  listItemTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#1a1a1a",
  },

  listItemSubtitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    marginTop: 4,
  },

  // Configuración y Ajustes
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  settingLabel: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#1a1a1a",
  },

  settingValue: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#4CAF50",
  },

  // Badges y Etiquetas
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#E8F5E9",
  },

  badgeText: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#4CAF50",
  },

  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#f5f5f5",
    marginRight: 8,
    marginBottom: 8,
  },

  tagText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
  },

  // Modales y Overlays
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
  },

  // Componentes de Carga
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#666",
  },

  // Tabs y Navegación Segmentada
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 16,
    borderRadius: 12,
    padding: 4,
  },

  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },

  tabActive: {
    backgroundColor: "#4CAF50",
  },

  tabText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
  },

  tabTextActive: {
    color: "#fff",
  },

  // Comparador de Fotos
  compareContainer: {
    flexDirection: "row",
    height: 400,
    marginVertical: 16,
  },

  compareImage: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },

  compareDivider: {
    width: 2,
    backgroundColor: "#fff",
    marginHorizontal: 8,
  },

  compareDate: {
    position: "absolute",
    bottom: 16,
    left: 16,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 8,
    borderRadius: 8,
  },

  compareDateText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },

  // Elementos de Feedback
  successMessage: {
    backgroundColor: "#E8F5E9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  successText: {
    color: "#2E7D32",
    fontFamily: "Poppins_400Regular",
    marginLeft: 8,
  },

  warningMessage: {
    backgroundColor: "#FFF3E0",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  warningText: {
    color: "#F57C00",
    fontFamily: "Poppins_400Regular",
    marginLeft: 8,
  },

  // Elementos de Entrada Personalizados
  inputGroup: {
    marginBottom: 16,
  },

  inputLabel: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#1a1a1a",
    marginBottom: 8,
  },

  inputError: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#c62828",
    marginTop: 4,
  },

  inputIcon: {
    position: "absolute",
    right: 12,
    top: 12,
  },

  // Elementos de Lista Avanzados
  swipeableRow: {
    backgroundColor: "#fff",
  },

  swipeableButtons: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },

  swipeButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: "100%",
  },

  deleteSwipeButton: {
    backgroundColor: "#ff4444",
  },

  editSwipeButton: {
    backgroundColor: "#4CAF50",
  },

  // Elementos de Calendario
  calendar: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },

  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  calendarTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#1a1a1a",
  },

  calendarDay: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },

  calendarDayText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },

  calendarDaySelected: {
    backgroundColor: "#4CAF50",
  },

  calendarDaySelectedText: {
    color: "#fff",
  },

  muscleGroup: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    marginBottom: 12,
    textAlign: "center",
  },

  muscleGroupBadge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  exerciseInfo: {
    flex: 1,
    marginRight: 8,
  },

  muscleGroupText: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#4CAF50",
  },

  workoutStats: {
    flexDirection: "row",
    alignItems: "center",
  },

  statBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },

  statText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#4CAF50",
    marginLeft: 4,
  },

  exercisesContainer: {
    marginBottom: 16,
  },

  moreExercises: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    marginTop: 8,
  },

  duration: {
    flexDirection: "row",
    alignItems: "center",
  },

  durationText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    marginLeft: 4,
  },

  workoutActions: {
    flexDirection: "row",
    alignItems: "center",
  },

  editButton: {
    backgroundColor: "#4CAF50",
  },

  deleteButton: {
    backgroundColor: "#ff4444",
  },

  playButton: {
    backgroundColor: "#1a1a1a",
  },

  actionButtonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingHorizontal: 8, // Añadimos algo de espacio horizontal
  },

  photoDate: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#333",
    marginBottom: 4,
  },

  photoInfo: {
    padding: 12,
  },

  photoType: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#4CAF50",
    marginBottom: 8,
  },

  photoNotes: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    marginTop: 4,
  },

  metricContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },

  metricHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  metricContent: {
    marginLeft: 16,
  },

  metricValue: {
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
    color: "#1a1a1a",
  },

  metricLabel: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#666",
  },

  trendContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },

  trendText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    marginLeft: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  measurementsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  measurementsTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 16,
  },

  measurementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  measurementItem: {
    width: "48%",
    marginBottom: 16,
  },

  measurementValue: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#1a1a1a",
  },

  // Estilos para Compare

  imageContainer: {
    flex: 1,
    margin: 4,
  },

  dateContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 8,
    borderRadius: 8,
  },
  dateText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  controls: {
    padding: 16,
  },

  // Estilos para Capture
  camera: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionText: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  permissionButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  photoTypeSelector: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  photoTypeButton: {
    padding: 8,
    marginHorizontal: 8,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  photoTypeButtonSelected: {
    backgroundColor: "#4CAF50",
  },
  photoTypeText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  photoTypeTextSelected: {
    fontFamily: "Poppins_600SemiBold",
  },
  controlsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  controlButton: {
    padding: 12,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4CAF50",
  },

  uploadProgress: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },

  uploadProgressText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    marginLeft: 8,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },

  title: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 20,
    color: "#1a1a1a",
  },

  historySection: {
    marginTop: 24,
  },
  historyTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  historyCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  historyDate: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#4CAF50",
    marginBottom: 8,
  },
  historyGrid: {
    gap: 8,
  },
  historyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyLabel: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
  },
  historyValue: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#1a1a1a",
  },
  expandButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    padding: 8,
  },
  expandButtonText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#4CAF50",
    marginRight: 4,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
