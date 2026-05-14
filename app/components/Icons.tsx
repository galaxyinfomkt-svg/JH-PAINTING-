/**
 * Centralized icon barrel — every page imports from this single module so the
 * lucide-react bundle can be tree-shaken and pre-cached cleanly. Adding a new
 * icon? Add it here, then import it from `@/app/components/Icons` anywhere.
 *
 * Filename casing matters: it MUST be `Icons.tsx` (capital I). Windows is
 * case-insensitive but Linux CI is not, and a parallel lowercase `icons.tsx`
 * file previously caused TS to load both and complain. Keep this file alone.
 */
export {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Droplets,
  Expand,
  Facebook,
  Grid3X3,
  Hammer,
  Heart,
  Home,
  LayoutGrid,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  PaintBucket,
  Paintbrush,
  Palette,
  Phone,
  Play,
  Search,
  Share2,
  Shield,
  Sparkles,
  Star,
  Sun,
  Tag,
  Timer,
  TrendingUp,
  Users,
  Wrench,
  X,
} from 'lucide-react'
