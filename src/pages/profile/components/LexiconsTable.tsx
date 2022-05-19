import { RemoteTable } from '@/components';
import apis from '@/utils/apis';

export const LexiconsTable: React.FC = () => {
  return <RemoteTable api={apis.getUserLexicons} columns={[]} />;
};
