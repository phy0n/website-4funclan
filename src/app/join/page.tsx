import { Metadata } from 'next';
import JoinClient from './JoinClient';

export const metadata: Metadata = {
  title: '4FUN Open Member',
  description: '4FUN is a private gaming community. Check the countdown for our next open member phase.',
};

export default function JoinPage() {
  const targetDate = "2026-11-05T15:00:00+07:00";

  return <JoinClient targetDate={targetDate} />;
}
