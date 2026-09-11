export type TabType = 'intro' | 'playground' | 'concepts' | 'animations' | 'snippets' | 'gotchas' | 'quiz';

export type WidgetType = 
  | 'container' 
  | 'row_column' 
  | 'text' 
  | 'button' 
  | 'card_listtile' 
  | 'scaffold'
  | 'stack_positioned'
  | 'gridview'
  | 'wrap_chips'
  | 'textfield_forms'
  | 'image_decoration';

export interface ContainerProps {
  width: number;
  height: number;
  color: string;
  padding: number;
  margin: number;
  borderRadius: number;
  borderWidth: number;
  borderColor: string;
  hasShadow: boolean;
  alignment: 'center' | 'topLeft' | 'bottomRight';
  childText: string;
}

export interface RowColumnProps {
  direction: 'row' | 'column';
  mainAxisAlignment: 'start' | 'center' | 'end' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly';
  crossAxisAlignment: 'start' | 'center' | 'end' | 'stretch';
  itemCount: number;
  spacing: number;
}

export interface TextProps {
  content: string;
  fontSize: number;
  fontWeight: 'normal' | 'bold' | 'w300' | 'w600' | 'w800';
  color: string;
  letterSpacing: number;
  textAlign: 'left' | 'center' | 'right';
  maxLines: number;
  overflowEllipsis: boolean;
}

export interface ButtonProps {
  variant: 'elevated' | 'outlined' | 'text' | 'floating';
  label: string;
  icon: string;
  bgColor: string;
  textColor: string;
  borderRadius: number;
  elevation: number;
  paddingV: number;
  paddingH: number;
}

export interface CardListTileProps {
  title: string;
  subtitle: string;
  leadingIcon: string;
  trailingIcon: string;
  elevation: number;
  borderRadius: number;
  isThreeLine: boolean;
}

export interface ScaffoldProps {
  appBarTitle: string;
  appBarColor: string;
  bodyBgColor: string;
  showDrawer: boolean;
  showFAB: boolean;
  showBottomNav: boolean;
  centerTitle: boolean;
  fabIcon: string;
}

export interface StackPositionedProps {
  stackAlignment: 'topStart' | 'center' | 'bottomEnd';
  badgeTop: number;
  badgeRight: number;
  badgeCount: number;
  avatarSize: number;
  showBanner: boolean;
  showStatusDot: boolean;
  isOnline: boolean;
}

export interface GridViewProps {
  crossAxisCount: 2 | 3 | 4;
  crossAxisSpacing: number;
  mainAxisSpacing: number;
  childAspectRatio: number;
  itemCount: number;
  cardStyle: 'modern' | 'minimal' | 'bordered';
}

export interface WrapChipsProps {
  spacing: number;
  runSpacing: number;
  alignment: 'start' | 'center' | 'end' | 'spaceBetween';
  selectedCategory: string;
  showAvatar: boolean;
  showDeleteIcon: boolean;
}

export interface TextFieldFormsProps {
  label: string;
  hintText: string;
  helperText: string;
  isFilled: boolean;
  hasBorder: boolean;
  borderRadius: number;
  showPrefixIcon: boolean;
  showSuffixClear: boolean;
  isPassword: boolean;
  switchValue: boolean;
  sliderValue: number;
  checkboxValue: boolean;
}

export interface ImageDecorationProps {
  fit: 'cover' | 'contain' | 'fill' | 'fitWidth';
  borderRadius: number;
  hasGradientOverlay: boolean;
  hasShadow: boolean;
  aspectRatio: '16/9' | '4/3' | '1/1';
  imageCategory: 'nature' | 'tech' | 'avatar';
}

export interface CodeSnippet {
  id: string;
  category: 'basics' | 'ui' | 'state' | 'networking' | 'navigation';
  title: string;
  subtitle: string;
  description: string;
  code: string;
  notes?: string[];
  tags: string[];
}

export interface GotchaItem {
  id: string;
  title: string;
  badge: string;
  symptom: string;
  cause: string;
  badCode: string;
  goodCode: string;
  fixExplanation: string;
  tip: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
}
